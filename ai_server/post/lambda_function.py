import json
import getpass
import os
import textwrap
from dotenv import load_dotenv

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
    
    

    
    print('>>>>>>>>>>', NEO4J_URI)




    # 이벤트에서 postId와 content를 추출
    postId = event.get('title')
    content = event.get('content')
    
    # content가 이미 사전 형태의 리스트이므로 JSON 파싱이 필요 없음
    data = content
    
    # "type"이 "paragraph", "mention", "heading"인 객체들의 "text" 속성을 이어붙일 문자열
    result_text = ''

    # 각 객체를 순회하면서 조건에 맞는 "text" 속성을 추출하여 문자열로 이어붙임
    for obj in data:
        if obj["type"] in ["paragraph", "mention", "heading"]:
            if "content" in obj and len(obj["content"]) > 0 and "text" in obj["content"][0]:
                result_text += obj["content"][0]["text"]


    # print(NEO4J_URI)

    kg = Neo4jGraph(
    url=NEO4J_URI, username=NEO4J_USERNAME, password=NEO4J_PASSWORD, database=NEO4J_DATABASE
    )

    kg.query("""
         CREATE VECTOR INDEX `embeddedPost` IF NOT EXISTS
          FOR (c:Chunk) ON (c.textEmbedding) 
          OPTIONS { indexConfig: {
            `vector.dimensions`: 1536,
            `vector.similarity_function`: 'cosine'    
         }}
    """)

    kg.query("""
    MATCH (chunk:Chunk) WHERE chunk.textEmbedding IS NULL
    WITH chunk, genai.vector.encode(
    chunk.text, 
    "OpenAI", 
    {
        token: $openAiApiKey, 
        endpoint: $openAiEndpoint
    }) AS vector
    CALL db.create.setNodeVectorProperty(chunk, "textEmbedding", vector)

    WITH chunk
    MATCH (post:Post {id: $postId}) 
    MERGE (chunk)-[:EMBED]->(post) 
    RETURN chunk, post
    """, 
    params={"openAiApiKey":OPENAI_API_KEY, "openAiEndpoint": OPENAI_BASE_URL})

    # 결과 출력
    print(result_text)
    
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "postId": postId,
            "extractedText": result_text
        })
    }
