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


user_question = "국가에 대해서 알려줘"


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
        RETURN score, node.text AS text
    """
    similar = kg.query(
        vector_search_query,
        params={
            "question": question,
            "openAiApiKey": OPENAI_API_KEY,
            "openAiEndpoint": OPENAI_BASE_URL,
            "index_name": VECTOR_INDEX_NAME,
            "top_k": 1,
        },
    )
    return similar


search_results = neo4j_vector_search(user_question)

print("search_results > ", search_results)

# kg.refresh_schema()

# print("kg.schema >>>>> ", kg.schema)


# retrieval_query_window = """
# MATCH (c:Chunks) WHERE ID(c) = 195
# RETURN c.text as text, 0.5 as score, c {.source} AS metadata
# """


# print("retrieval_query_window >>> ", retrieval_query_window)


# print("result >>>>>>>>> ", kg.query(retrieval_query_window))


"""
MATCH window=
    (:Chunk)-[:NEXT*0..1]->(node)-[:NEXT*0..1]->(:Chunk)
WITH node, score, window as longestWindow 
  ORDER BY length(window) DESC LIMIT 1
WITH nodes(longestWindow) as chunkList, node, score
  UNWIND chunkList as chunkRows
WITH collect(chunkRows.text) as textList, node, score
RETURN apoc.text.join(textList, " \n ") as text,
    score,
    node {.source} AS metadata
"""


neo4j_vector_store = Neo4jVector.from_existing_index(
    embedding=OpenAIEmbeddings(),
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    index_name=VECTOR_INDEX_NAME,
    node_label=VECTOR_NODE_LABEL,
    # text_node_properties=[VECTOR_SOURCE_PROPERTY],
    # text_node_property=VECTOR_SOURCE_PROPERTY,
    embedding_node_property=VECTOR_EMBEDDING_PROPERTY,
    # retrieval_query=retrieval_query_window,
)

# print("neo4j vector store >>>> ", neo4j_vector_store.node_label)
# print("retriever >>>> ", neo4j_vector_store.as_retriever())

context = search_results[0]["text"]


retriever = neo4j_vector_store.as_retriever()

review_template = """너가 알고 있는 것에 대해서만 대답해. 조금이라도 관련이 있으면 찾아서 대답을 하려고 해봐. 하지만 최대한 내가 제공하는 context 안에서 대답을 해줘. 
{context}

"""


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

print(reviews_vector_chain.invoke(user_question))


# chain = RetrievalQAWithSourcesChain.from_chain_type(
#     ChatOpenAI(temperature=0), chain_type="stuff", retriever=retriever
# )


# general_system_template = """
#     너가 알고있는 모든 것에 대해 알려줘. 하지만 내가 제공하는 데이터 안에 해당하지 않으면 대답하지마. 한글로 대답해.
#     ----
#     {summaries}
#     ----
#     모르면 대답하지마.
#     """
# general_user_template = "Question:```{question}```"
# messages = [
#     SystemMessagePromptTemplate.from_template(general_system_template),
#     HumanMessagePromptTemplate.from_template(general_user_template),
# ]
# qa_prompt = ChatPromptTemplate.from_messages(messages)

# # qa_prompt = "Question: ```너가 알고있는 모든 것에 대해 알려줘. 하지만 내가 제공하는 데이터 안에 해당하지 않으면 대답하지마. 한글로 대답해.```"

# qa_chain = load_qa_with_sources_chain(
#     ChatOpenAI(temperature=0),
#     chain_type="stuff",
#     prompt=qa_prompt,
# )


# kg_qa = RetrievalQAWithSourcesChain(
#     combine_documents_chain=qa_chain,
#     retriever=retriever,
#     reduce_k_below_max_tokens=False,
#     max_tokens_limit=3375,
# )

# print("kg_qa >>>>>>>> ", kg_qa)

# print("chain >>>>>>>> ", chain(kg_qa))

# output_function = kg_qa


# print(
#     "output >>>>>> ",
#     output_function(
#         {"question": "너가 아는게 뭐야?", "chat_history": []},
#     ),
# )

# hi = chain("너가 아는게 뭐야?")

# print("hi > ", hi)


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
