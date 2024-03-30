import json
import getpass
import os
import textwrap
from dotenv import load_dotenv
import uuid

from langchain.docstore.document import Document
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Neo4jVector
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.graphs import Neo4jGraph

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQAWithSourcesChain
from langchain_openai import ChatOpenAI


from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler



def lambda_handler(event, context):

  # 환경 변수 로드
  load_dotenv('.env', override=True)

  # Neo4j 데이터베이스 설정
  NEO4J_URI = os.getenv('NEO4J_URI')
  NEO4J_USERNAME = os.getenv('NEO4J_USERNAME')
  NEO4J_PASSWORD = os.getenv('NEO4J_PASSWORD')
  NEO4J_DATABASE = os.getenv('NEO4J_DATABASE') or 'neo4j'

  # OpenAI 설정
  OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
  OPENAI_BASE_URL = os.getenv('OPENAI_BASE_URL')

  # URI 출력
  print('>>>>>>>>>>', NEO4J_URI)
  

  # 이벤트에서 postId와 content 추출
  postId = event.get("postId")
  content = event.get("content")





  # content가 사전 형태의 리스트이므로 JSON 파싱 필요 없음
  data = content

  # "type"이 "paragraph", "mention", "heading"인 객체들의 "text" 속성을 이어붙일 문자열 초기화
  result_text = ''

  # 각 객체 순회하며 조건에 맞는 "text" 속성 추출하여 문자열로 이어붙임
  for obj in data:
      if obj["type"] in ["paragraph", "mention", "heading"]:
          if "content" in obj and len(obj["content"]) > 0 and "text" in obj["content"][0]:
              result_text += obj["content"][0]["text"]

  print("파싱 완료")

  print("파싱 완료 어브젝트: ", result_text)


  chunkText = result_text

  merge_chunk_node_query = """
  MERGE(mergedChunk:Chunks)
      ON CREATE SET
          mergedChunk.text = $chunkText
      WITH mergedChunk
          MATCH (p:Post) WHERE ID(p) = $postId
          MERGE (mergedChunk)-[:EMBED]->(p)
  RETURN mergedChunk
  """





  # Neo4j 그래프 초기화
  kg = Neo4jGraph(
      url=NEO4J_URI,
      username=NEO4J_USERNAME,
      password=NEO4J_PASSWORD,
      database=NEO4J_DATABASE
  )



  kg.query(merge_chunk_node_query, 
          params={'chunkText': chunkText, 'postId': postId })




  # 벡터 인덱스 생성 쿼리
  vector = kg.query("""
      CREATE VECTOR INDEX `embeddedPost` IF NOT EXISTS
      FOR (c:Chunks) ON (c.textEmbeddings)
      OPTIONS { indexConfig: {
          `vector.dimensions`: 1536,
          `vector.similarity_function`: 'cosine'    
      }}
  """)

  print("인덱스 생성 쿼리", kg.query("SHOW INDEXES"))



  print("벡터 인덱스 생성 완료")

  # 벡터 인코딩 및 노드 연결 쿼리
  kg.query("""
      MATCH (chunks:Chunks) WHERE chunks.textEmbeddings IS NULL
      WITH chunks, genai.vector.encode(
          chunks.text, 
          "OpenAI", 
          {
              token: $openAiApiKey, 
              endpoint: $openAiEndpoint
          }) AS vector
      CALL db.create.setNodeVectorProperty(chunks, "textEmbeddings", vector)
  """, 
  params={"openAiApiKey":OPENAI_API_KEY, "openAiEndpoint": OPENAI_BASE_URL, "postId": postId})

  # 결과 출력
  print("결과 : ", result_text)


  return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"postId": postId, "extractedText": result_text}),
  }