from langchain_community.graphs import Neo4jGraph
from langchain.chains import RetrievalQA
from langchain_openai import OpenAIEmbeddings
import requests
import os
from langchain.vectorstores.neo4j_vector import Neo4jVector


url = "bolt://localhost:7687"
username = "neo4j"
password = ""

graph = Neo4jGraph(url=url, username=username, password=password)


url2 = "https://gist.githubusercontent.com/tomasonjo/08dc8ba0e19d592c4c3cde40dd6abcc3/raw/da8882249af3e819a80debf3160ebbb3513ee962/microservices.json"
import_query = requests.get(url2).json()["query"]
graph.query(import_query)


vector_index = Neo4jVector.from_existing_graph(
    OpenAIEmbeddings(),
    url=url,
    username=username,
    password=password,
    index_name="tasks",
    node_label="Task",
    text_node_properties=["name", "description", "status"],
    embedding_node_property="embedding",
)


response = vector_index.similarity_search("How will RecommendationService be updated?")
print("response >>>>>> ", response[0].page_content)


# vector_qa = RetrievalQA.from_chain_type(
#     llm=OpenAIEmbeddings(), chain_type="stuff", retriever=vector_index.as_retriever()
# )
# vector_qa.run("How will recommendation service be updated?")
