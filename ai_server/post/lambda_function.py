import json
import getpass
import os
import textwrap
from dotenv import load_dotenv
import uuid



from langchain.docstore.document import Document
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Neo4jVector
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.graphs import Neo4jGraph


from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQAWithSourcesChain
from langchain_openai import ChatOpenAI





def lambda_handler(event, context):
    
    
    load_dotenv('.env', override=True)

    NEO4J_URI = os.getenv('NEO4J_URI')
    NEO4J_USERNAME = os.getenv('NEO4J_USERNAME')
    NEO4J_PASSWORD = os.getenv('NEO4J_PASSWORD')
    NEO4J_DATABASE = os.getenv('NEO4J_DATABASE') or 'neo4j'
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    OPENAI_BASE_URL = os.getenv('OPENAI_BASE_URL')



    
    
    VECTOR_INDEX_NAME = 'form_10k_chunks'
    VECTOR_NODE_LABEL = 'Chunks'
    VECTOR_SOURCE_PROPERTY = 'text'
    VECTOR_EMBEDDING_PROPERTY = 'textEmbeddings'


    starPostId = event.get('starPostId')

    # 이벤트에서 postId와 content를 추출
    content = event.get('content')
    
    print("postId >>>>>> ", starPostId)
    print("content >>>>>> ", content)
    print("type of content >>>>> ", type(content))
    
#     from openai import OpenAI
#     client = OpenAI()

#     client.embeddings.create(
#     model="text-embedding-3-large",
#     input="The food was delicious and the waiter...",
#     encoding_format="float"
# )



    def generate_unique_chunk_id():
        return str(uuid.uuid4())
   

    # content가 사전 형태의 리스트이므로 JSON 파싱 필요 없음
    data = content

    # "type"이 "paragraph", "mention", "heading"인 객체들의 "text" 속성을 이어붙일 문자열 초기화
    result_text = ''

    # 각 객체 순회하며 조건에 맞는 "text" 속성 추출하여 문자열로 이어붙임
    # for obj in data:
    #     if obj["type"] in ["paragraph", "mention", "heading"]:
    #         if "content" in obj and len(obj["content"]) > 0 and "text" in obj["content"][0]:
    #             result_text += obj["content"][0]["text"]
    
    

    data = json.loads(content)

    def extract_text(content):
        """Recursively extracts text from the content field."""
        if isinstance(content, dict):
            if 'type' in content and content['type'] == 'text' and 'text' in content:
                return content['text'].strip()
            else:
                return ''.join(extract_text(item) for item in content.values())
        elif isinstance(content, list):
            return ''.join(extract_text(item) for item in content)
        else:
            return ''

    # Extracting all the text
    all_text = ''.join(extract_text(item) for item in data)

    print(all_text)
    
    result_text = all_text
        


    print("파싱 완료 문자열 : ", result_text)


    chunkText = result_text

    chunkId = generate_unique_chunk_id()

    merge_chunk_node_query = """
    MERGE (mergedChunk:Chunks {chunkId: $chunkId})
        ON CREATE SET
            mergedChunk.text = $chunkText
        WITH mergedChunk
            MATCH (p:Post) WHERE ID(p) = $postId
            MERGE (mergedChunk)-[:EMBED]->(p)
    RETURN mergedChunk
    """


    # Neo4j 그래프 초기화
    kg = Neo4jGraph(
        url=NEO4J_URI,
        username=NEO4J_USERNAME,
        password=NEO4J_PASSWORD,
        database=NEO4J_DATABASE
    )



    kg.query(merge_chunk_node_query, 
        params={'chunkId': chunkId, 'chunkText': chunkText, 'postId': starPostId})


    kg.query("""
    CREATE CONSTRAINT unique_chunks IF NOT EXISTS 
        FOR (c:Chunks) REQUIRE c.chunkId IS UNIQUE
    """)


    # 벡터 인덱스 생성 쿼리
    vector = kg.query("""
        CREATE VECTOR INDEX `embeddedPosts` IF NOT EXISTS
        FOR (c:Chunks) ON (c.textEmbeddings)
        OPTIONS { indexConfig: {
            `vector.dimensions`: 1536,
            `vector.similarity_function`: 'cosine'    
        }}
    """)

    print("인덱스 생성 쿼리", kg.query("SHOW INDEXES"))



    print("벡터 인덱스 생성 완료")
    
    
    

    # 벡터 인코딩 및 노드 연결 쿼리
    kg.query("""
        MATCH (chunks:Chunks) WHERE chunks.textEmbeddings IS NULL
        WITH chunks, genai.vector.encode(
            chunks.text, 
            "OpenAI", 
            {
                token: $openAiApiKey, 
                endpoint: $openAiEndpoint
            }) AS vector
        CALL db.create.setNodeVectorProperty(chunks, "textEmbeddings", vector)
    """, 
    params={"openAiApiKey":OPENAI_API_KEY, "openAiEndpoint": OPENAI_BASE_URL})



    # 결과 출력
    print("결과 : ", result_text)


    return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"postId": starPostId, "content": content}),
    }