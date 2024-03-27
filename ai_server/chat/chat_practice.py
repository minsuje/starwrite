import json
import getpass
import os
import textwrap
from dotenv import load_dotenv
import uuid


from langchain.docstore.document import Document
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Neo4jVector
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.graphs import Neo4jGraph
from langchain.chains import GraphCypherQAChain
from langchain_core.output_parsers import StrOutputParser
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQAWithSourcesChain
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

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

kg = Neo4jGraph(
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    database=NEO4J_DATABASE,
)


def neo4j_vector_search(question):
    """Search for similar nodes using the Neo4j vector index"""
    vector_search_query = """
        WITH genai.vector.encode(
        $question,
        "OpenAI",
        {
            token: $openAiApiKey,
            endpoint: $openAiEndpoint
        }) AS question_embedding
        CALL db.index.vector.queryNodes($index_name, $top_k, question_embedding) yield node,    score
        RETURN score, node.text AS text, node.chunkId AS chunckId
    """
    similar = kg.query(
        vector_search_query,
        params={
            "question": question,
            "openAiApiKey": OPENAI_API_KEY,
            "openAiEndpoint": OPENAI_BASE_URL,
            "index_name": VECTOR_INDEX_NAME,
            "top_k": 5,
        },
    )
    return similar


search_results = neo4j_vector_search("웹툰에 대해서 알려줘")

print("search_results > ", search_results[0])

kg.refresh_schema()


# print("kg.schema >>>>> ", kg.schema)


retrieval_query_window = """
MATCH (c:Chunks)
RETURN c.text as text,
    c.source AS metadata
"""


neo4j_vector_store = Neo4jVector.from_existing_index(
    embedding=OpenAIEmbeddings(),
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    index_name=VECTOR_INDEX_NAME,
    # node_label=VECTOR_NODE_LABEL,
    # text_node_properties=[VECTOR_SOURCE_PROPERTY],
    text_node_property=VECTOR_SOURCE_PROPERTY,
    # embedding_node_property=VECTOR_EMBEDDING_PROPERTY,
    retrieval_query=retrieval_query_window,
)
retriever = neo4j_vector_store.as_retriever()

print("neo4j_vector_store node_label > ", neo4j_vector_store.node_label)
print(
    "neo4j_vector_store embedding_node_property > ",
    neo4j_vector_store.embedding_node_property,
)


chain = RetrievalQAWithSourcesChain.from_chain_type(
    ChatOpenAI(temperature=0), chain_type="stuff", retriever=retriever
)

chain("Who is Netapp ?")


# chain = RetrievalQAWithSourcesChain.from_chain_type(
#     ChatOpenAI(temperature=0), chain_type="stuff", retriever=retriever
# )


# def prettychain(question: str) -> str:
#     """Pretty print the chain's response to a question"""
#     response = chain(
#         {"question": question},
#         return_only_outputs=True,
#     )
#     print(textwrap.fill(response["answer"], 600))


# question = "람다에 대해서 알려줘"

# print("prettyChain > ", prettychain(question))
