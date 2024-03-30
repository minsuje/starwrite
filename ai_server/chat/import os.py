import os
from dotenv import load_dotenv

from langchain_community.vectorstores import Neo4jVector
from langchain_openai import OpenAIEmbeddings


user_question = "windows가 뭐야?"
userId = "e137cd34-f54b-4087-a725-a28f46e61854"

load_dotenv(".env", override=True)

NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
NEO4J_DATABASE = os.getenv("NEO4J_DATABASE") or "neo4j"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL")

VECTOR_INDEX_NAME = "embeddedPost"
VECTOR_NODE_LABEL = "Chunks"
VECTOR_SOURCE_PROPERTY = "text"
VECTOR_EMBEDDING_PROPERTY = "textEmbeddings"


retrieval_query = """
    WITH node AS chunk, score as similarity
    ORDER BY similarity DESC LIMIT 5
    CALL { WITH chunk
      OPTIONAL MATCH (u:Users)-[:POSTED]->(p:Post)-[:EMBED]-(chunk:Chunks) WHERE u.userId = "e137cd34-f54b-4087-a725-a28f46e61854"
      RETURN u, p AS result, c
    }
    WITH result, c, similarity
    RETURN c.text as text,
    similarity as score,
    {source: c.source} AS metadata
"""


kg = Neo4jVector.from_existing_index(
    embedding=OpenAIEmbeddings(),
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    database="neo4j",  # neo4j by default
    index_name=VECTOR_INDEX_NAME,  # vector by default
    text_node_property=VECTOR_EMBEDDING_PROPERTY,  # text by default
    retrieval_query=retrieval_query,
)


query = user_question
docs_with_score = kg.similarity_search_with_score(query, k=5)


for text, score in docs_with_score:
    print("-" * 80)
    print("Score: ", score)
    print(text)
    print("-" * 80)
