# import json
# import getpass
import os

# import textwrap
from dotenv import load_dotenv

# import uuid


# from langchain.docstore.document import Document
# from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Neo4jVector

# from langchain_text_splitters import CharacterTextSplitter
from langchain_community.graphs import Neo4jGraph

# from langchain.chains import GraphCypherQAChain
# from langchain_core.output_parsers import StrOutputParser
from langchain.chains import RetrievalQAWithSourcesChain

# from langchain.chains.qa_with_sources import load_qa_with_sources_chain
# from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQAWithSourcesChain

# from langchain_core.runnables import RunnableLambda, RunnablePassthrough
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


def lambda_handler(event, context):

    user_question = event.get("question")
    userId = event.get("userId")

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

    # def neo4j_vector_search(question):
    #     """Search for similar nodes using the Neo4j vector index"""
    #     vector_search_query = """
    #         WITH genai.vector.encode(
    #         $question,
    #         "OpenAI",
    #         {
    #             token: $openAiApiKey,
    #             endpoint: $openAiEndpoint
    #         }) AS question_embedding
    #         CALL db.index.vector.queryNodes($index_name, $top_k, question_embedding) yield node,    score
    #         RETURN score, node.text AS text
    #     """
    #     similar = kg.query(
    #         vector_search_query,
    #         params={
    #             "question": question,
    #             "openAiApiKey": OPENAI_API_KEY,
    #             "openAiEndpoint": OPENAI_BASE_URL,
    #             "index_name": VECTOR_INDEX_NAME,
    #             "top_k": 3,
    #         },
    #     )
    #     return similar

    def neo4j_vector_search(userId, question):
        """Search for similar nodes connected to a specific user using the Neo4j vector index"""

        # vector_search_query = """
        #     MATCH (u:Users {userId: $userId})-[:POSTED]->()->[:EMBED]-(c:Chunks)
        #     WITH genai.vector.encode(
        #     $question,
        #     "OpenAI",
        #     {
        #         token: $openAiApiKey,
        #         endpoint: $openAiEndpoint
        #     }) AS question_embedding, c
        #     CALL db.index.vector.queryNodes($index_name, $top_k, question_embedding) yield node, score
        #     WHERE node = c
        #     RETURN score, node.text AS text
        # """

        vector_search_query = """
            MATCH (u:Users {userId: $userId})-[:POSTED]->(p:Post)-[:EMBED]-(c:Chunks)
            WITH genai.vector.encode(
            $question,
            "OpenAI",
            {
                token: $openAiApiKey,
                endpoint: $openAiEndpoint
            }) AS question_embedding, c, p
            CALL db.index.vector.queryNodes($index_name, $top_k, question_embedding) YIELD node, score
            WHERE node = c
            RETURN score, c.text AS text, collect({postId: ID(p), title: p.title, content: substring(p.parsedContent, 0, 100)}) AS source
        """

        print(
            "neo4j_vector_search userId > ",
            userId,
            " / user_question > ",
            question,
        )

        similar = kg.query(
            vector_search_query,
            params={
                "question": question,
                "userId": userId,
                "openAiApiKey": OPENAI_API_KEY,
                "openAiEndpoint": OPENAI_BASE_URL,
                "index_name": VECTOR_INDEX_NAME,
                "top_k": 3,
            },
        )
        return similar

    search_results = neo4j_vector_search(userId, user_question)

    print("search_results > ", search_results)

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

    context = search_results[0]["text"]

    review_template = """너가 알고 있는 것에 대해서만 대답해. 조금이라도 관련이 있으면 찾아서 대답을 하려고 해봐. 하지만 최대한 내가 제공하는 context 안에서 대답을 해줘. 
{context}

"""

    chain = RetrievalQAWithSourcesChain.from_chain_type(
        ChatOpenAI(temperature=0), chain_type="stuff", retriever=retriever
    )

    review_system_prompt = SystemMessagePromptTemplate(
        prompt=PromptTemplate(input_variables=["context"], template=review_template)
    )

    review_human_prompt = HumanMessagePromptTemplate(
        prompt=PromptTemplate(input_variables=["question"], template="{question}")
    )
    messages = [review_system_prompt, review_human_prompt]

    review_prompt = ChatPromptTemplate(
        input_variables=["context", "question"], messages=messages
    )

    reviews_vector_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(temperature=0),
        chain_type="stuff",
        retriever=retriever,
    )

    # print(reviews_vector_chain.invoke(user_question))

    json_data = reviews_vector_chain.invoke(user_question)

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": {"ai": json_data, "source": search_results[0]["source"][0]},
    }
