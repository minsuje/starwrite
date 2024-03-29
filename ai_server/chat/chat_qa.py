import os
from dotenv import load_dotenv

from langchain_community.vectorstores import Neo4jVector
from langchain_community.graphs import Neo4jGraph
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.chains import RetrievalQAWithSourcesChain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.chains import LLMChain
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate

from langchain.prompts import (
    PromptTemplate,
    SystemMessagePromptTemplate,
)

from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)


user_question = "클라이언트가 뭐야?"
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
VECTOR_SOURCE_PROPERTY = "text"
VECTOR_EMBEDDING_PROPERTY = "textEmbeddings"

# kg = Neo4jGraph(
#     url=NEO4J_URI,
#     username=NEO4J_USERNAME,
#     password=NEO4J_PASSWORD,
#     database=NEO4J_DATABASE,
# )

retrieval_query = """
MATCH (u:Users {userId: "e137cd34-f54b-4087-a725-a28f46e61854"})-[:POSTED]->(p:Post)-[:EMBED]-(c:Chunks)
RETURN c.text AS text, 1 as score, {source: "23423432"} AS metadata
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


# general_system_template = """
#     너가 알고 있는 것에 대해서만 대답해. 조금이라도 관련이 있으면 찾아서 대답을 하려고 해봐. 하지만 최대한 내가 제공하는 summaries 안에서 대답을 해줘. 예를 들어 떡볶이 라는 context 가 없으면 너는 모른다고 대답해야해.
#     summaries :
#     ----
#     {summaries}
#     ----

#     """
# general_user_template = "Question:```{question}```"
# messages = [
#     SystemMessagePromptTemplate.from_template(general_system_template),
#     HumanMessagePromptTemplate.from_template(general_user_template),
# ]
# qa_prompt = ChatPromptTemplate.from_messages(messages)

# llm = ChatOpenAI(
#     temperature=0,
#     max_tokens=2048,
#     model_name="gpt-3.5-turbo",
# )

# qa_chain = load_qa_with_sources_chain(
#     llm,
#     chain_type="stuff",
#     prompt=qa_prompt,
# )

# kg_qa = RetrievalQAWithSourcesChain(
#     combine_documents_chain=qa_chain,
#     retriever=kg.as_retriever(search_kwargs={"k": 1}),
#     reduce_k_below_max_tokens=False,
#     max_tokens_limit=3375,
# )


# result = kg_qa({"question": user_question, "chat_history": []})["answer"]
# print("result > ", result)


##########
## 유사도 검색

# query = user_question

# results = kg.similarity_search(query, k=1)
# print(results[0].page_content)


##########
## RAG QA


# chain = RetrievalQAWithSourcesChain.from_chain_type(
#     ChatOpenAI(temperature=0), chain_type="stuff", retriever=kg.as_retriever()
# )

# query = user_question

# chain(
#     {"question": query},
#     return_only_outputs=True,
# )
