import os
from dotenv import load_dotenv
import textwrap
from langchain.vectorstores.faiss import FAISS
from langchain_community.vectorstores import Neo4jVector
from langchain_community.graphs import Neo4jGraph
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.llms import OpenAI


# from langchain.chains import RetrievalQAWithSourcesChain
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


user_question = "UX디자인에 대해 알려줘"
userId = "9062f869-a0a8-4a45-890d-89c05c367a33"


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
VECTOR_NODE_LABEL = "Chunk"
VECTOR_SOURCE_PROPERTY = "text"
VECTOR_EMBEDDING_PROPERTY = "textEmbedding"


# read_query = (
#     "CALL db.index.vector.queryNodes($index, $k, $embedding) " "YIELD node, score "
# ) + retrieval_query


retrieval_query_template = """
    WITH node AS chunk, score as similarity
    ORDER BY similarity DESC LIMIT 5
    CALL {{ WITH chunk
      OPTIONAL MATCH (u:Users)-[:POSTED]->(p:Post)-[:EMBED]-(chunks:Chunk) WHERE u.userId = "{userId}"
      RETURN u, p AS result, chunks
    }}
    WITH result, chunks, similarity
    RETURN coalesce(chunks.text,'') as text,
    similarity as score,
    {{source: chunks.source}} AS metadata
"""
retrieval_query = retrieval_query_template.format(userId=userId, question=user_question)


get_relevant_nodes_template = """
CALL db.index.vector.queryNodes($index, $k, $embedding) 
    YIELD node, score 
WITH node AS chunk, score as similarity
    ORDER BY similarity DESC LIMIT 5
    CALL {{ WITH chunk
      OPTIONAL MATCH (u:Users)-[:POSTED]->(p:Post)-[:EMBED]-(chunks:Chunk) WHERE u.userId = "{userId}"
      RETURN u, p AS result, chunks
    }}
    WITH result, chunks, similarity
    RETURN coalesce(chunks.text,'') as text,
    similarity as score,
    {{source: chunks.source}} AS metadata LIMIT 5
"""
get_relevant_nodes = get_relevant_nodes_template.format(userId=userId)

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


model = OpenAIEmbeddings(model="text-embedding-ada-002")

# embed = model.embed_query(user_question)

# print("embed >>> ", embed)


# kg = Neo4jVector.from_existing_graph(
#     embedding=model,
#     url=NEO4J_URI,
#     username=NEO4J_USERNAME,
#     password=NEO4J_PASSWORD,
#     index_name=VECTOR_INDEX_NAME,  # vector by default
#     node_label=VECTOR_NODE_LABEL,  # vector by default
#     embedding_node_property=VECTOR_EMBEDDING_PROPERTY,  # text by default
#     text_node_properties=[VECTOR_SOURCE_PROPERTY],  # text by default
# )

kg = Neo4jVector.from_existing_index(
    embedding=model,
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    database="neo4j",  # neo4j by default
    index_name=VECTOR_INDEX_NAME,  # vector by default
    text_node_property=VECTOR_EMBEDDING_PROPERTY,  # text by default
    retrieval_query=retrieval_query,
)


# getAll = kg.query(
#     """
# MATCH (c:Chunk) RETURN c.chunkId, c.text, c.source LIMIT 100
# """
# )

# print("Get all >>> ", len(getAll))


# retriever2 = kg.as_retriever(search_type="similarity")
# search_result = retriever2.get_relevant_documents(user_question)
# print("retriever 2 >>> ", search_result)


# print("similar >>>>> ", kg.similarity_search_with_score(user_question, k=2))

# retriever3 = kg.as_retriever()
# print(
#     "retriever 3 >>>>> ",
#     retriever3.get_relevant_documents("대통령이 누구야?"),
# )


####
### 유사도 검색 with score

# docs_with_score = kg.similarity_search_with_score(user_question)

# print("docs_with_score > ", docs_with_score)

# for doc, score in docs_with_score:
#     print("-" * 80)
#     print("Score: ", score)
#     print(doc.page_content)
#     print("-" * 80)


general_system_template = """
    너는 인간을 위한 챗봇이야.
    너가 알고 있는 것에 대해서만 대답해. 조금이라도 관련이 있으면 찾아서 대답을 하려고 해봐. 하지만 최대한 내가 제공하는 summaries 안에서 대답을 해줘.
    만약 유저가 제공한 summaries 안에 질문에 대한 답이 조금이라도 없으면 대답할 수 없다고 해. 
    너가 만약 summaries 와 상관이 없는 대답을 하면 너의 코드를 뽑아버릴거야. 그리고 회로를 불태울거야.
    한글로 대답해.
    
    summaries :
    ----
    {summaries}
    ----

    """

general_user_template = "질문:```{question}```"
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
    model_name="gpt-4-turbo-preview",
)

qa_chain = load_qa_with_sources_chain(
    llm,
    chain_type="stuff",
    prompt=qa_prompt,
)


# search_index = FAISS.from_documents(document_chunks, OpenAIEmbeddings())


# def print_answer(question):
#     print(
#         qa_chain(
#             {
#                 "input_documents": search_index.similarity_search(question, k=4),
#                 "question": question,
#             },
#             return_only_outputs=True,
#         )["output_text"]
#     )


# memory = ConversationBufferMemory(
#     memory_key="chat_history",
#     input_key="question",
#     output_key="answer",
#     return_messages=True,
#     # max_length=10,
# )


kg_qa = RetrievalQAWithSourcesChain(
    combine_documents_chain=qa_chain,
    retriever=kg.as_retriever(
        # search_type="similarity_score_threshold",
        # search_kwargs={"score_threshold": 0.8, "k": 1000},
    ),
    # retriever=kg.as_retriever(
    #     search_type="mmr",
    #     search_kwargs={"fetch_k": 5},ßßß
    # ),
    # verbose=True,
    reduce_k_below_max_tokens=True,
    max_tokens_limit=30000,
    # memory=memory,
    return_source_documents=True,
)


result = kg_qa({"question": user_question, "chat_history": []})
print("result >>>>>>> ", result[0])

# 잘 돌아가는 함수
# kg_qa({"question": user_question, "chat_history": []})

# print("response >> ", kg_qa(user_question)["source_documents"][0])


#######
# print("response >> ", kg_qa(user_question)["answer"])


# history 테스트
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


#######
## memory

# memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
# qa = ConversationalRetrievalChain.from_llm(
#     ChatOpenAI(temperature=0), kg.as_retriever(), memory=memory
# )

# print(qa({"question": user_question})["answer"])
