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


load_dotenv(".env", override=True)

OPENAI_ENDPOINT = os.getenv("OPENAI_BASE_URL") + "/embeddings"

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

# postId와 nickname 값을 추출
postId = 13
nickname = "라마"
userId = "a555f3aa-317a-4dbf-8200-f5722a6153ff"
categoryId = "719088ae-779e-49b0-b020-afcb539e759f"

# postId와 nickname 사용하여 원하는 작업 수행
print("postId:", postId)
print("nickname:", nickname)
print("categoryId", categoryId)

find_chunk = """
MATCH (post: Post)
MATCH (user:Users)-[r]->(post:Post)<-[e:EMBED]-(chunk:Chunks)
WHERE ID(post) = $postId AND user.nickname = $nickname
WITH collect(chunk.text) AS text, collect(post.title) AS title, collect(ID(chunk)) AS chunkId, ID(post) AS postId
RETURN text
ORDER BY chunkId
"""



#     print("chunk >>>>>>>>> ", find_chunk)
#
#     find_title = """
#     MATCH (post: Post)
#     WHERE ID(post) = $postId
#     RETURN collect(post.title) AS title
#     """
#
#     print(find_title)
#
find_other = """
MATCH (user)-[r]->(post:Post)<-[e:EMBED]-(chunk:Chunks)
WHERE user.nickname = $nickname
RETURN collect(chunk.text) AS text, collect(post.title) AS title, collect(ID(post)) AS postId
ORDER BY postId
"""

# # Neo4j 그래프 초기화
kg = Neo4jGraph(
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    database=NEO4J_DATABASE,
)

chunks_data = kg.query(find_chunk, params={"postId": postId, "nickname": nickname})
#     titles_data = kg.query(find_title, params={"postId": postId})
others_data = kg.query(find_other, params={"nickname": nickname})

# chunks_data가 비어 있을 경우에는 빈 리스트를 할당
chunks = (
    [{"text": row["text"]} for row in chunks_data]
    if chunks_data
    else None
)
# titles_data가 비어 있을 경우에는 빈 리스트를 할당
#     titles = [title for row in titles_data for title in row["title"]] if titles_data else None
#     # others_data가 비어 있을 경우에는 빈 리스트를 할당
others = [
    {"text": row["text"], "title": row["title"], "postId": row["postId"]}
    for row in others_data
] if others_data else None

#     print("find_chunks >>> ", chunks_data)
#     print("find_titles >>> ", titles_data)
#     print("find_other >>> ", others_data)

# others = others[0]
#     titles = titles[0]
# chunks = chunks[0]

#     print("chunks >>>>>>>>>>>>>>>> ", chunks)
#     print("titles >>>>>>>>>>>>>>>> ", titles)
#     print("others >>>>>>>>>>>>>>>> ", others)


# data = chunks
# print("data >>>>>>>>>> ", data)
# print("data metadata" , data)

#     CYPHER_GENERATION_TEMPLATE = """
#     Tesk : 내가 제공하는 others 의 text 를 읽고 내가 제공하는 chunks 의 text 와 비교 하여 관련된 내용이 있는지 확인해라
#     Instructions : 내가 제공하는 others, chunks 만 사용해라
#     others:
#     {others}
#     chunks:
#     {chunks}
#
#     Tesk : 관련된 내용의 others 의 title 과 내가 제공하는 titles 이 같은 지 비교해라
#     Instructions : 내가 제공하는 titles 만 사용해라
#     titles:
#     {titles}
#
#     Note: Do not include any explanations or apologies in your responses.
#     Do not respond to any questions that might ask anything else than
#     for you to construct a Cypher statement.
#     Do not include any text except the generated Cypher statement.
#     Examples: Here are a few examples of generated Cypher
#     statements for particular questions:
#
#     The question is:
#     {question}"""
#
#     CYPHER_GENERATION_PROMPT = PromptTemplate(
#         input_variables=["schema", "question"], template=CYPHER_GENERATION_TEMPLATE
#     )
#
#     cypherChain = GraphCypherQAChain.from_llm(
#         ChatOpenAI(temperature=0),
#         graph=kg,
#         verbose=True,
#         cypher_prompt=CYPHER_GENERATION_PROMPT,
#     )

# def prettyCypherChain(question: str) -> str:
# response = cypherChain.run(question, others=others, titles=titles, chunks=chunks)
# print(textwrap.fill(response, 60))

print("여기까지 정상 작동 >>>>> ")

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
retrieval_query= retrieval_query_template.format(userId=userId, categoryId=categoryId)


# retrieval_query = f"""
#   OPTIONAL MATCH (u:Users)-[:OWNS]->(c:Category)-[:IS_CHILD]->(p:Post)-[:EMBED]-(chunks:Chunks) WHERE u.userId = '{userId}' AND c.categoryId = '{categoryId}'
#   RETURN u, p AS result, chunks
# """
#
# queries = f"""
# MATCH (u:Users)-[:OWNS]->(category:Category)-[:IS_CHILD]->(post:Post)-[e:EMBED]-(c:Chunks)
# WHERE u.userId = '{userId}' AND category.categoryId = '{categoryId}'
# WITH post.title AS title, ID(post) AS postId, c.text AS text
# RETURN title, postId, text
# """

#     def neo4j_vector_search(userId, categoryId, postId):
#         """Search for similar nodes using the Neo4j vector index"""
#         vector_search_query = """
#                 MATCH (u:Users {userId: $userId})-[:OWNS]->(category:Category{categoryId: $categoryId})-[:IS_CHILD]->(post:Post{ID : $postId})-[:EMBED]-(c:Chunks)
#                 WITH genai.vector.encode(
#                 "OpenAI",
#                 {
#                     token: $openAiApiKey,
#                     endpoint: $openAiEndpoint
#                 }) AS question_embedding, post
#                 CALL db.index.vector.queryNodes($index_name, $top_k, question_embedding) YIELD node, score
#                 RETURN node.text AS text, ID(post) AS postId, post.title AS title
#             """
#         similar = kg.query(
#             vector_search_query,
#             params={
#                 "userId": userId,
#                 "categoryId": categoryId,
#                 "postId" : postId,
#                 "openAiApiKey": OPENAI_API_KEY,
#                 "openAiEndpoint": OPENAI_BASE_URL,
#                 "index_name": VECTOR_INDEX_NAME,
#                 "top_k": 100,
#             },
#         )
#         return similar
#
#         print("similar >>>>>", similar)
#
#     #     question = f"(1) postId가 {postId}인 값의 text 를 찾아. (2) {postId} 의 text 내용과 비슷한 내용을 가진 다른 text 들을 찾아. (3) 만약 (2)에서 찾은 값들의 title 이 postId 가 {postId}인 값의 text 내용에 있는 단어와 일치하면 (2)에서 찾은 값들의 postId를 알려줘 "
#
#     #     question=  f"userId가 {userId}인 Post 노드의 ID가 {postId} 인 Post 와 연관된 Chunks 의 text 내용과 비슷한 내용을 가진 내 Post 들의 Chunks 를 찾고 Post의 ID가 {postId} 를 가진 Post 와 연결된 Chunks 들의 text 내용 중에서 단어나 문장과 같은 이름을 가진 다른 Post 들의 title 을 찾아서 그 title 을 가진 Post의 ID 값을 알려줘 단, 중복된 Post ID값은 하나의 값만 알려줘"
#
#     result = neo4j_vector_search(userId, categoryId, postId)

#     print("result >>>>>>>>>> ", result)


kgs = Neo4jVector.from_existing_index(
    embedding=OpenAIEmbeddings(),
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    database="neo4j",  # neo4j by default
    index_name=VECTOR_INDEX_NAME,
    node_label=VECTOR_NODE_LABEL,
    embedding_node_property=VECTOR_EMBEDDING_PROPERTY,
    retrieval_query=retrieval_query
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



relevant_nodes = kg.query(find_relevant_post, params={"postId":postId})
print("relevant_nodes >>>>> ", relevant_nodes)

Ids = []
for node in relevant_nodes:
    title = node['title']

    find_post = """
    OPTIONAL MATCH (post:Post)-[:EMBED]-(chunk:Chunk)
    WHERE ID(post) = $postId AND post.parsedContent =~ ('.*' + $title + '.*')
    RETURN ID(post)
    """
    ids = kg.query(find_post, params={"postId":postId,"title":title})

    if ids:
      Ids.append(node['relatedPostId'])
#     titles.append(node['title'])
print("Ids >>>>>>" , Ids)

# foundPostContent = kg.query(find_post, params={"postId": postId})
#
# foundPost = foundPostContent[0]['post.parsedContent']
#
# # print("foundPost >>>> ", foundPost)
#
# retriever = kgs.as_retriever(
#   search_type="similarity_score_threshold",
#   search_kwargs={"score_threshold": 0.98, "k": 1}
# )


# DEFAULT_DOCUMENT_PROMPT = PromptTemplate.from_template(
#     template="{source}"
# )

# results = retriever.get_relevant_documents(foundPost)
# results = kgs.similarity_search(foundPost, k=1)
# print("prompt >>>>>>>>> " , retriever.DEFAULT_DOCUMENT_PROMPT)
# print("similarity_search results >>> ", results)



# ### 유사도 검사
# docs_with_score = kgs.similarity_search_with_score(foundPost)
#
# # print("docs_with_score" , docs_with_score)
#
# for doc, score in docs_with_score:
#     print("-" * 80)
#     print("Score: ", score)
#     print(doc.page_content)
#     print("-" * 80)

#     neo4j_vector_store = Neo4jVector.from_existing_index(
#         embedding=OpenAIEmbeddings(),
#         url=NEO4J_URI,
#         username=NEO4J_USERNAME,
#         password=NEO4J_PASSWORD,
#         index_name=VECTOR_INDEX_NAME,
#         node_label=VECTOR_NODE_LABEL,
#         embedding_node_property=VECTOR_EMBEDDING_PROPERTY,
#     )
#     retriever = neo4j_vector_store.as_retriever()
#
# general_system_template = """
#     너가 알고 있는 것에 대해서만 대답해. 조금이라도 관련이 있으면 찾아서 대답을 하려고 해봐. 하지만 최대한 내가 제공하는 summaries 안에서 대답을 해줘. 예를 들어 떡볶이 라는 context 가 없으면 너는 모른다고 대답해야해.
#     summaries :
#     ----
#     {summaries}
#     ----
#
#     """
# general_user_template = "Question:```{question}```"
#
# messages = [
#     SystemMessagePromptTemplate.from_template(general_system_template),
#     HumanMessagePromptTemplate.from_template(general_user_template),
# ]
# qa_prompt = ChatPromptTemplate.from_messages(messages)
#
# query = """
# MATCH (u:Users)-[:OWNS]->(category:Category)-[:IS_CHILD]->(post:Post)-[e:EMBED]-(c:Chunks)
# WHERE u.userId = $userId AND category.categoryId = $categoryId
# WITH post.title AS title, ID(post) AS postId, c.text AS text
# RETURN title, postId, text
# """
# result = kg.query(query, params={"userId": userId, "categoryId": categoryId})
#
# # 결과 처리
# results = []
# for record in results:
#     postId = record["postId"]
#     title = record["title"]
#     text = record["text"]
#     context = {
#         "postId": postId,
#         "title": title,
#         "text": text,
#         # 필요한 필드 추가
#     }
#     results.append(context)
#
# print("documents >>>>>>>>>>>>>>>>>> ", results)
# ### 연습
# chroma_db = Chroma.from_documents(results, OpenAIEmbeddings())
# similar_docs = chroma_db.similarity_search("Word2Vec 에 대하여 알려줘")
#
# print(similar_docs[0].page_content)



####





# query_mine = """
# MATCH (u:Users)-[:OWNS]->(category:Category)-[:IS_CHILD]->(post:Post)-[e:EMBED]-(c:Chunks)
# WHERE u.userId = $userId AND category.categoryId = $categoryId AND ID(post) = $postId
# WITH post.title AS title, ID(post) AS postId, c.text AS text
# RETURN title, postId, text
# """
# result_mine = kg.query(
#     query_mine,
#     params={"userId": userId, "categoryId": categoryId, "postId": postId},
# )

#     loader = TextLoader(cypher_query="MATCH (u:Users)-[:OWNS]->(category:Category)-[:IS_CHILD]->(post:Post)-[e:EMBED]-(c:Chunks) WHERE u.userId = $userId AND category.categoryId = $categoryId RETURN post,e,c", params={"userId": userId, "categoryId": categoryId})
#     document = loader.load_document()
#     print("document>>>>>>>> ", document)

#     retriever = neo4j_vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 100})
#     relevant_docs = retriever.get_relevant_documents("{result_mine}의 text와 비슷한 내용을 가진 것을 {documents}에서 찾고 만약 찾으면 {documents}의 title 값이 {result_mine}의 text 내용과 일치하는 단어가 있다면 나에게 {documents}의 해당하는 title을 가지고 있는 배열의 postId를 알려줘 ")

# result_mine과 documents를 문자열로 변환
#     result_mine_str = ", ".join([f"postId: {doc['postId']}, title: {doc['title']}, text: {doc['text']}" for doc in result_mine])
#     documents_str = ", ".join([f"postId: {doc['postId']}, title: {doc['title']}, text: {doc['text']}" for doc in documents])

# question 생성
#     question = f"{result_mine_str}의 text와 비슷한 내용을 가진 것을 {documents_str}에서 찾고 만약 찾으면 {documents_str}의 title 값이 {result_mine_str}의 text 내용과 일치하는 단어가 있다면 나에게 {documents_str}의 해당하는 title을 가지고 있는 배열의 postId를 알려줘 "
# user_question = f"{result_mine}의 text 와 비슷한 내용을 가진 것을 찾고 만약 찾으면 title 값이 {result_mine}의 text 내용과 일치하는 단어인 title 을 가지고 있는 content 의 postId 값을 나에게 알려줘 "
# user_question = "정당에 대해 알려줘"
#     question = f"{result_mine}의 text와 비슷한 내용을 가진 것을 {documents}에서 찾고 만약 찾으면 {documents}의 title 값이 {result_mine}의 text 내용과 일치하는 단어가 있다면 나에게 {documents}의 해당하는 title을 가지고 있는 배열의 postId를 알려줘 "
# llm = ChatOpenAI(
#     temperature=0,
#     max_tokens=2048,
#     streaming=True,
#     callbacks=[StreamingStdOutCallbackHandler()],
#     model_name="gpt-3.5-turbo",
# )  # 또는 원하는 Chat 모델을 선택합니다.

# qa_chain = load_qa_with_sources_chain(
#     llm,
#     chain_type="stuff",
#     prompt=qa_prompt,
# )

# memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
# memory = ConversationBufferMemory(
#     memory_key="chat_history",
#     input_key="question",
#     output_key="answer",
#     return_messages=True,
# )

# kg_qa = RetrievalQAWithSourcesChain(
#     combine_documents_chain=qa_chain,
#     retriever=kgs.as_retriever(search_kwargs={"k": 100}),
#     reduce_k_below_max_tokens=False,
#     max_tokens_limit=3375,
#     memory=memory,
#     return_source_documents=True,
# )

# 잘 돌아가는 함수
# kg_qa({"question": user_question, "chat_history": []})

# print("kg_qa>>>>>>>>>>>>>>>", kg_qa)
#     response = llm.generate(question)


#     단어에 해당하는 내용을 저장소에서 유사도 검사를 실시함
#     sub_docs = neo4j_vector_store.similarity_search(f"{result}")


#     context = result

#     review_template = f"""Post의 ID 를 찾는데 {postId} 와 같은 ID는 알려주지 말고 중복된 ID 값들은 여러개 알려주지 말고 하나만 알려줘 """
#
#
#
#     chain = RetrievalQAWithSourcesChain.from_chain_type(
#             ChatOpenAI(temperature=0), chain_type="stuff", retriever=retriever
#     )
#
#     review_system_prompt = SystemMessagePromptTemplate(
#             prompt=PromptTemplate(input_variables=["context"], template=review_template)
#     )
#
#     review_human_prompt = HumanMessagePromptTemplate(
#             prompt=PromptTemplate(input_variables=["question"], template="{question}")
#     )
#
#     messages = [review_system_prompt, review_human_prompt]
#
#     review_prompt = ChatPromptTemplate(
#             input_variables=["context", "question"], messages=messages
#     )
#
#     reviews_vector_chain = RetrievalQA.from_chain_type(
#                 llm=ChatOpenAI(temperature=0),
#                 chain_type="stuff",
#                 retriever=retriever,
#     )

#     json_data = reviews_vector_chain.invoke(question)

#     print("json_data >>>>>>>" ,json_data )
#     json_data = result


#     def prettyCypherChain(question: str, others=None, titles=None, chunks=None) -> str:
#         response = cypherChain.run(
#             question=question, others=others, titles=titles, chunks=chunks
#         )
#         return textwrap.fill(response, 60)
#
#     result = prettyCypherChain(
#         question="내 글에서 에서 해당 글의 내용에 나오는 단어나 문장과 이름이 같은 title을 가진 post 를 찾고 찾은 글의 내용이 내 글과 같은 내용이면 찾은 글의 postId 들을 알려줘 만약 같은 postId가 여러개면 중복된 postId는 제거하고 알려줘",
#         others=others,
#         titles=titles,
#         chunks=chunks,
#     )
#
print("여기까지")
#     print(result)
