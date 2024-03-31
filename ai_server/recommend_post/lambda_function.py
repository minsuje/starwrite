import json
import getpass
import os
import textwrap
from dotenv import load_dotenv
import uuid
from langchain_community.vectorstores import Chroma


from langchain.docstore.document import Document
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Neo4jVector
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.graphs import Neo4jGraph
from langchain.chains import RetrievalQA

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQAWithSourcesChain
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import GraphCypherQAChain

from langchain.memory import ConversationBufferMemory

from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

from langchain.chains.qa_with_sources import load_qa_with_sources_chain


from langchain.prompts import (
    PromptTemplate,
    SystemMessagePromptTemplate,
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

from langchain_community.document_loaders import JSONLoader


OPENAI_ENDPOINT = os.getenv("OPENAI_BASE_URL") + "/embeddings"


def lambda_handler(event, context):

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
    postId = event.get("postId")
    nickname = event.get("nickname")
    userId = event.get("userId")
    categoryId = event.get("categoryId")

    # postId와 nickname 사용하여 원하는 작업 수행
    print("postId:", postId)
    print("nickname:", nickname)
    print("categoryId", categoryId)

    # # Neo4j 그래프 초기화
    kg = Neo4jGraph(
        url=NEO4J_URI,
        username=NEO4J_USERNAME,
        password=NEO4J_PASSWORD,
        database=NEO4J_DATABASE,
    )

    retrieval_query_template = """
            WITH node AS chunk, score as similarity
            CALL {{ WITH chunk
              OPTIONAL MATCH (u:Users)-[:OWNS]->(c:Category)-[:IS_CHILD]->(p:Post)-[:EMBED]-(chunks:Chunk) WHERE u.userId = "{userId}" AND c.categoryId = "{categoryId}"
              RETURN u, p AS result, chunks
            }}
            WITH result, chunks, similarity
            RETURN coalesce(chunks.text,'') as text,
            similarity as score,
            {{source: chunks.source}} AS metadata
        """
    retrieval_query = retrieval_query_template.format(
        userId=userId, categoryId=categoryId
    )

    kgs = Neo4jVector.from_existing_index(
        embedding=OpenAIEmbeddings(),
        url=NEO4J_URI,
        username=NEO4J_USERNAME,
        password=NEO4J_PASSWORD,
        database="neo4j",  # neo4j by default
        index_name=VECTOR_INDEX_NAME,
        node_label=VECTOR_NODE_LABEL,
        embedding_node_property=VECTOR_EMBEDDING_PROPERTY,
        retrieval_query=retrieval_query,
    )

    # print(chunks["text"])

    find_post = """
    MATCH (post:Post) WHERE ID(post) = $postId
    RETURN post.parsedContent
    """

    find_relevant_post = """
    MATCH (post:Post)-[:EMBED]-(chunk:Chunk) WHERE ID(post) = $postId

    CALL db.index.vector.queryNodes('embeddedPost', 10, chunk.textEmbedding)
    YIELD node AS similar_abstract, score

    MATCH (similar_abstract)-[:EMBED]-(op:Post)
    WITH ID(op) AS relatedPostId, score, op.title AS title
    WHERE score >= 0.9
    RETURN DISTINCT relatedPostId, MAX(score) AS score, title
    ORDER BY score DESC
    """

    relevant_nodes = kg.query(find_relevant_post, params={"postId": postId})
    print("relevant_nodes >>>>> ", relevant_nodes)

    Ids = []
    for node in relevant_nodes:
        title = node["title"]

        find_post = """
        OPTIONAL MATCH (post:Post)-[:EMBED]-(chunk:Chunk)
        WHERE ID(post) = $postId AND post.parsedContent =~ ('.*' + $title + '.*')
        RETURN ID(post)
        """
        ids = kg.query(find_post, params={"postId": postId, "title": title})

        if ids:
            Ids.append(node["relatedPostId"])
    #     titles.append(node['title'])
    print("Ids >>>>>>", Ids)
    print("완료")

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": Ids,
    }
