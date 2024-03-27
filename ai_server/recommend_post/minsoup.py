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


OPENAI_ENDPOINT = os.getenv('OPENAI_BASE_URL') + '/embeddings'





def lambda_handler(event, context):


    load_dotenv('.env', override=True)

    NEO4J_URI = os.getenv('NEO4J_URI')
    NEO4J_USERNAME = os.getenv('NEO4J_USERNAME')
    NEO4J_PASSWORD = os.getenv('NEO4J_PASSWORD')
    NEO4J_DATABASE = os.getenv('NEO4J_DATABASE') or 'neo4j'
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    OPENAI_BASE_URL = os.getenv('OPENAI_BASE_URL')


  postId = event['queryStringParameters']['postId']
  nickname = event['queryStringParameters']['nickname']

  print("post ID : ", postId)
  print("nickname : " , nickname)

    # "type"이 "paragraph", "mention", "heading"인 객체들의 "text" 속성을 이어붙일 문자열 초기화
    result_text = ''

    find_chunk = """
    MATCH (user:Users{nickname:$nickname})
      WITH user
      MATCH (post: Post {ID: $postId})-[r:EMBED]-(chunk:Chunks)
   RETURN collect(chunk.text) AS text, collect(post.title) AS title
   ORDER BY ID(chunk)
    """

    print("chunk >>>>>>>>> ", find_chunk)

    find_title = """
    MATCH (post: Post{ID:$postId})
    RETURN collect(post.title) AS title
    """"

    print(find_title)

    find_other = """
    MATCH (user:Users{nickname: $nickname})
      WITH user
      MATCH (post:Post)-[r:EMBED]-(chunk:Chunks)
    RETURN collect(chunk.text) AS text, collect(post.title) AS title, collect(ID(post)) AS postId
    """"

    print("find_other >>> " , find_other)

    # Neo4j 그래프 초기화
    kg = Neo4jGraph(
        url=NEO4J_URI,
        username=NEO4J_USERNAME,
        password=NEO4J_PASSWORD,
        database=NEO4J_DATABASE
    )


    kg.query(find_chunk, params={'postId' : postId, 'nickname': nickname})
    kg.query(find_title, params={'postId' : postId})
    kg.query(find_other, params={'nickname' : nickname})




    CYPHER_GENERATION_TEMPLATE = """
    Tesk : 내가 제공하는 find_other 의 text 를 읽고 내가 제공하는 find_chunk 의 text 와 비교 하여 관련된 내용이 있는지 확인해라
    Instructions : 내가 제공하는 find_other, find_chunk 만 사용해라
    find_other:
    {find_other}
    find_chunk:
    {find_chunk}

    Tesk : 관련된 내용의 find_other 의 title 과 내가 제공 find_title 이 같은 지 비교해라
    Instructions : 내가 제공하는 find_title 만 사용해라
    find_title:
    {find_title}

    Note: Do not include any explanations or apologies in your responses.
    Do not respond to any questions that might ask anything else than
    for you to construct a Cypher statement.
    Do not include any text except the generated Cypher statement.
    Examples: Here are a few examples of generated Cypher
    statements for particular questions:

    The question is:
    {question}"""



    CYPHER_GENERATION_PROMPT = PromptTemplate(
        input_variables=["schema", "question"],
        template=CYPHER_GENERATION_TEMPLATE
    )



    cypherChain = GraphCypherQAChain.from_llm(
        ChatOpenAI(temperature=0),
        graph=kg,
        verbose=True,
        cypher_prompt=CYPHER_GENERATION_PROMPT,
    )


    def prettyCypherChain(question: str) -> str:
        response = cypherChain.run(question)
        print(textwrap.fill(response, 60))


    return prettyCypherChain("내 글에서 에서 해당 글의 내용에 나오는 단어나 문장과 이름이 같은 title을 가진 post 를 찾고 찾은 글의 내용이 내 글과 같은 내용이면 찾은 글의 postId 들을 알려줘 만약 같은 postId가 여러개면 중복된 postId는 제거하고 알려줘")
