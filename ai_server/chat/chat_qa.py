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
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

from langchain.prompts import (
    PromptTemplate,
    SystemMessagePromptTemplate,
)

from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory


user_question = "국무총리는 누가 임명해?"
userId = "e59ae8c5-41da-486d-9629-0318d50a5d48"


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


# 작동하는 쿼리
# retrieval_query = """
# MATCH (u:Users {userId: "e137cd34-f54b-4087-a725-a28f46e61854"})-[:POSTED]->(p:Post)-[:EMBED]-(c:Chunks)
# RETURN c.text AS text, similarity as score, {source: "23423432"} AS metadata LIMIT 1
# """

retrieval_query = """
    WITH node AS chunk, score as similarity
    ORDER BY similarity DESC LIMIT 10
    CALL { WITH chunk
      OPTIONAL MATCH (u:Users)-[:POSTED]->(p:Post)-[:EMBED]-(chunks:Chunks) WHERE u.userId = {0}
      RETURN u, p AS result, chunks
    }
    WITH result, chunks, similarity
    RETURN coalesce(chunks.text,'') as text,
    similarity as score,
    {source: chunks.source} AS metadata LIMIT 10
""".format(
    userId
)

retrieval_query_dummy = """
  WITH node AS doc, score as similarity
  ORDER BY similarity DESC LIMIT 5
  CALL { WITH doc
    OPTIONAL MATCH (prevDoc:Chunk)-[:NEXT]->(doc)
    OPTIONAL MATCH (doc)-[:NEXT]->(nextDoc:Chunk)
    RETURN prevDoc, doc AS result, nextDoc
  }
  WITH result, prevDoc, nextDoc, similarity
  CALL {
    WITH result
    OPTIONAL MATCH (result)-[:PART_OF]->(:Form)<-[:FILED]-(company:Company), (company)<-[:OWNS_STOCK_IN]-(manager:Manager)
    WITH result, company.name as companyName, apoc.text.join(collect(manager.managerName),';') as managers
    WHERE companyName IS NOT NULL OR managers > ""
    WITH result, companyName, managers
    ORDER BY result.score DESC
    RETURN result as document, result.score as popularity, companyName, managers
  }
  RETURN coalesce(prevDoc.text,'') + coalesce(document.text,'') + coalesce(nextDoc.text,'') as text,
    similarity as score,
    {documentId: coalesce(document.chunkId,''), company: coalesce(companyName,''), managers: coalesce(managers,''), source: document.source} AS metadata
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


general_system_template = """
    너가 알고 있는 것에 대해서만 대답해. 조금이라도 관련이 있으면 찾아서 대답을 하려고 해봐. 하지만 최대한 내가 제공하는 summaries 안에서 대답을 해줘. 예를 들어 떡볶이 라는 context 가 없으면 너는 모른다고 대답해야해.
    summaries :
    ----
    {summaries}
    ----

    """
general_user_template = "Question:```{question}```"
messages = [
    SystemMessagePromptTemplate.from_template(general_system_template),
    HumanMessagePromptTemplate.from_template(general_user_template),
]
qa_prompt = ChatPromptTemplate.from_messages(messages)

llm = ChatOpenAI(
    temperature=0,
    max_tokens=2048,
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()],
    model_name="gpt-3.5-turbo",
)

qa_chain = load_qa_with_sources_chain(
    llm,
    chain_type="stuff",
    prompt=qa_prompt,
)

# memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
memory = ConversationBufferMemory(
    memory_key="chat_history",
    input_key="question",
    output_key="answer",
    return_messages=True,
)

kg_qa = RetrievalQAWithSourcesChain(
    combine_documents_chain=qa_chain,
    retriever=kg.as_retriever(search_kwargs={"k": 5}),
    reduce_k_below_max_tokens=False,
    max_tokens_limit=3375,
    memory=memory,
    return_source_documents=True,
)


# 잘 돌아가는 함수
kg_qa({"question": user_question, "chat_history": []})


# history 테스트
# result = kg_qa({"question": user_question, "chat_history": []})["answer"]


# print("result > ", result)


####
### 유사도 검색 with score

# query = user_question
# docs_with_score = kg.similarity_search_with_score(query, k=1)


# for doc, score in docs_with_score:
#     print("-" * 80)
#     print("Score: ", score)
#     print(doc.page_content)
#     print("-" * 80)


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


#######
## memory

# memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
# qa = ConversationalRetrievalChain.from_llm(
#     ChatOpenAI(temperature=0), kg.as_retriever(), memory=memory
# )

# print(qa({"question": user_question})["answer"])
