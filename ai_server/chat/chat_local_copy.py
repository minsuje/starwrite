import os
from dotenv import load_dotenv

from langchain_community.vectorstores import Neo4jVector
from langchain_community.graphs import Neo4jGraph
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.chains import RetrievalQAWithSourcesChain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA

from langchain.prompts import (
    PromptTemplate,
    SystemMessagePromptTemplate,
)

from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)


from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter


user_question = "프레임워크가 뭐야?"
userId = "e137cd34-f54b-4087-a725-a28f46e61854"


print("user_question > ", user_question)
print("userId > ", userId)

load_dotenv(".env", override=True)

NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
NEO4J_DATABASE = os.getenv("NEO4J_DATABASE") or "neo4j"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL")

VECTOR_INDEX_NAME = "embeddedPost"
VECTOR_NODE_LABEL = "Chunks"
# VECTOR_SOURCE_PROPERTY = "text"
VECTOR_EMBEDDING_PROPERTY = "textEmbeddings"

kg = Neo4jGraph(
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    database=NEO4J_DATABASE,
)


# def neo4j_vector_search(userId, question):
#     """Search for similar nodes connected to a specific user using the Neo4j vector index"""

#     vector_search_query = """
#         MATCH (u:Users {userId: $userId})-[:POSTED]->(p:Post)-[:EMBED]-(c:Chunks)
#         WITH genai.vector.encode(
#         $question,
#         "OpenAI",
#         {
#             token: $openAiApiKey,
#             endpoint: $openAiEndpoint
#         }) AS question_embedding, c, p
#         CALL db.index.vector.queryNodes($index_name, $top_k, question_embedding) YIELD node, score
#         WHERE node = c
#         RETURN score, c.text AS text, collect({postId: ID(p), title: p.title, content: substring(p.parsedContent, 0, 100)}) AS source
#     """

#     print(
#         "neo4j_vector_search userId > ",
#         userId,
#         " / user_question > ",
#         question,
#     )

#     similar = kg.query(
#         vector_search_query,
#         params={
#             "question": question,
#             "userId": userId,
#             "openAiApiKey": OPENAI_API_KEY,
#             "openAiEndpoint": OPENAI_BASE_URL,
#             "index_name": VECTOR_INDEX_NAME,
#             "top_k": 3,
#         },
#     )
#     return similar


# search_results = neo4j_vector_search(userId, user_question)

# print("search_results > ", search_results)


neo4j_vector_store = Neo4jVector.from_existing_index(
    embedding=OpenAIEmbeddings(),
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    index_name=VECTOR_INDEX_NAME,
    node_label=VECTOR_NODE_LABEL,
    embedding_node_property=VECTOR_EMBEDDING_PROPERTY,
)

retriever = neo4j_vector_store.as_retriever()


def neo4j_vector_search(userId, question):
    # loader = TextLoader("./data/appendix-keywords.txt")

    # userId = "e59ae8c5-41da-486d-9629-0318d50a5d48"

    # # 특정 유저의 문서를 로드합니다.
    # user_documents = loader.load_user_documents(userId)

    # # 문자 기반으로 텍스트를 분할하는 CharacterTextSplitter를 생성합니다. 청크 크기는 1000이고 청크 간 중복은 없습니다.
    # text_splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=0)

    # # 특정 유저의 문서를 분할합니다.
    # user_texts = text_splitter.split_documents(user_documents)

    # # OpenAI 임베딩을 생성합니다.
    # embeddings = OpenAIEmbeddings()

    # # Neo4jVector를 사용하여 벡터 데이터베이스를 생성합니다.
    # db = Neo4jVector()

    # # 특정 유저의 문서를 데이터베이스에 추가합니다.
    # for text in user_texts:
    #     vector = embeddings.encode(text)
    #     db.add_document(
    #         text, vector, userId=userId
    #     )  # 특정 유저의 userId 값을 함께 전달합니다.

    # 특정 유저의 문서 내에서 관련 문서를 검색합니다.
    user_query = "떡볶이는 무엇인가요?"
    user_relevant_docs = kg.get_relevant_documents(
        user_query, userId=userId
    )  # 특정 유저의 userId 값을 전달합니다.

    print("user_relevant_docs > ", user_relevant_docs[0])

    return user_relevant_docs[0]


neo4j_vector_search(userId, user_question)


# # 사용자 ID에 해당하는 문서만 필터링하는 쿼리
# def get_user_documents(userId):
#     query = f"""
#     MATCH (n:Chunks)-[:EMBED]-(p:Post)-[]-(u:Users)
#     WHERE u.userId = '{userId}'
#     RETURN n
#     """
#     return kg.query


# # 특정 사용자 문서에 대해 관련 문서를 검색하는 함수
# def get_relevant_documents_for_user(query_text, userId):
#     user_docs = get_user_documents(userId)
#     # user_docs를 이용해 필터링된 노드에 대해 검색
#     return retriever.get_relevant_documents(query_text, custom_filter=user_docs)


# # 사용 예시
# relevant_docs = get_relevant_documents_for_user("김밥에 대하여 알려줘", userId)

# print("relevant_docs > ", relevant_docs)

# print("relevant_docs > ", relevant_docs)


# -------------------------


# context = search_results[0]["text"]

# review_template = """너가 알고 있는 것에 대해서만 대답해. 조금이라도 관련이 있으면 찾아서 대답을 하려고 해봐. 하지만 최대한 내가 제공하는 context 안에서 대답을 해줘.
# {context}

# """

# chain = RetrievalQAWithSourcesChain.from_chain_type(
#     ChatOpenAI(temperature=0), chain_type="stuff", retriever=retriever
# )

# review_system_prompt = SystemMessagePromptTemplate(
#     prompt=PromptTemplate(input_variables=["context"], template=review_template)
# )

# review_human_prompt = HumanMessagePromptTemplate(
#     prompt=PromptTemplate(input_variables=["question"], template="{question}")
# )
# messages = [review_system_prompt, review_human_prompt]

# review_prompt = ChatPromptTemplate(
#     input_variables=["context", "question"], messages=messages
# )

# reviews_vector_chain = RetrievalQA.from_chain_type(
#     llm=ChatOpenAI(temperature=0),
#     chain_type="stuff",
#     retriever=retriever,
# )

# json_data = reviews_vector_chain.invoke(user_question)
