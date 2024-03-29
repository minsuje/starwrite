import os
from dotenv import load_dotenv

from langchain_community.vectorstores import Neo4jVector
from langchain_openai import OpenAIEmbeddings
from langchain_community.graphs import Neo4jGraph


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

# postId와 nickname 값을 추출
postId = 218
nickname = "알아서뭐해_"
userId = "e137cd34-f54b-4087-a725-a28f46e61854"
categoryId = "3e9c346f-cf3b-4516-8ffb-5c7cb8f7f28d"


# postId와 nickname 사용하여 원하는 작업 수행
print("postId:", postId)
print("nickname:", nickname)
print("categoryId", categoryId)


find_chunk = """
MATCH (post:Post)
MATCH (user:Users)-[r]->(post)<-[e:EMBED]-(chunk:Chunks)
WHERE ID(post) = $postId AND user.nickname = $nickname
WITH collect(chunk.text) AS text, collect(post.title) AS title, collect(ID(chunk)) AS chunkId
RETURN text, title
ORDER BY chunkId
"""


# Neo4j 그래프 초기화
kg = Neo4jGraph(
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    database=NEO4J_DATABASE,
)

chunks_data = kg.query(find_chunk, params={"postId": postId, "nickname": nickname})

print("find_chunks >>> ", chunks_data)

# chunks_data가 비어 있을 경우에는 빈 리스트를 할당
chunks = (
    [{"text": row["text"], "title": row["title"]} for row in chunks_data]
    if chunks_data
    else None
)


chunks = chunks[0]

print("chunks >>>>>>>>>>>>>>>> ", chunks)

print("여기까지 정상 작동 >>>>> ")


neo4j_vector_store = Neo4jVector.from_existing_index(
    embedding=OpenAIEmbeddings(),
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    index_name=VECTOR_INDEX_NAME,
    node_label=VECTOR_NODE_LABEL,
    embedding_node_property=VECTOR_EMBEDDING_PROPERTY,
)

retriever = neo4j_vector_store.as_retriever(
    search_type="similarity", search_kwargs={"k": 5}
)
relevant_docs = retriever.get_relevant_documents(
    f" (1). {chunks}의 text와 비슷한 내용을 가진 것들을 찾고 만약 찾아. (2). 내용들이 Category 의 categoryId = {categoryId} 인 곳에 속해 있다면 (1) 에서 찾은 것들의 Post 노드 title 과 {chunks}의 text 내용에 있는 단어가 같다면 해당하는 Post의 ID를 알려줘"
)


print("relevant_docs >>>>>>>>>>> ", relevant_docs)
