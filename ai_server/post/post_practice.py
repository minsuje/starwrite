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


load_dotenv(".env", override=True)

NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
NEO4J_DATABASE = os.getenv("NEO4J_DATABASE") or "neo4j"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL")

VECTOR_INDEX_NAME = "form_10k_chunks"
VECTOR_NODE_LABEL = "Chunks"
VECTOR_SOURCE_PROPERTY = "text"
VECTOR_EMBEDDING_PROPERTY = "textEmbeddings"

starPostId = "265"
content = [
    {
        "id": "57e82753-8c8e-45c1-a00f-48355c1341e9",
        "type": "paragraph",
        "props": {
            "textColor": "default",
            "backgroundColor": "default",
            "textAlignment": "left",
        },
        "content": [
            {
                "type": "text",
                "text": "지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는 아니된다. 언론·출판이 타인의 명예나 권리를 침해한 때에는 피해자는 이에 대한 피해의 배상을 청구할 수 있다. 위원은 정당에 가입하거나 정치에 관여할 수 없다. 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 감사원은 세입·세출의 결산을 매년 검사하여 대통령과 차년도국회에 그 결과를 보고하여야 한다. 모든 국민은 종교의 자유를 가진다. 대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다.",
                "styles": {},
            }
        ],
        "children": [],
    },
    {
        "id": "bb7bea5c-e221-4c4d-a99b-b629be0c9ce1",
        "type": "paragraph",
        "props": {
            "textColor": "default",
            "backgroundColor": "default",
            "textAlignment": "left",
        },
        "content": [
            {
                "type": "text",
                "text": "모든 국민은 신체의 자유를 가진다. 누구든지 법률에 의하지 아니하고는 체포·구속·압수·수색 또는 심문을 받지 아니하며, 법률과 적법한 절차에 의하지 아니하고는 처벌·보안처분 또는 강제노역을 받지 아니한다. 형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는 불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에 의하여 국가에 정당한 보상을 청구할 수 있다. 공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는 공공단체에 정당한 배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 헌법재판소 재판관은 정당에 가입하거나 정치에 관여할 수 없다.",
                "styles": {},
            }
        ],
        "children": [],
    },
    {
        "id": "71238ca9-55f4-43b2-921e-eee7e11012e0",
        "type": "paragraph",
        "props": {
            "textColor": "default",
            "backgroundColor": "default",
            "textAlignment": "left",
        },
        "content": [
            {
                "type": "text",
                "text": "대통령은 국무총리·국무위원·행정각부의 장 기타 법률이 정하는 공사의 직을 겸할 수 없다. 행정각부의 장은 국무위원 중에서 국무총리의 제청으로 대통령이 임명한다. 국가는 사회보장·사회복지의 증진에 노력할 의무를 진다. 이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다. 형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다. 국회의원은 국회에서 직무상 행한 발언과 표결에 관하여 국회외에서 책임을 지지 아니한다. 국회는 헌법개정안이 공고된 날로부터 60일 이내에 의결하여야 하며, 국회의 의결은 재적의원 3분의 2 이상의 찬성을 얻어야 한다.",
                "styles": {},
            }
        ],
        "children": [],
    },
    {
        "id": "403dc453-c405-41a3-9ba1-25199f4974a8",
        "type": "paragraph",
        "props": {
            "textColor": "default",
            "backgroundColor": "default",
            "textAlignment": "left",
        },
        "content": [
            {
                "type": "text",
                "text": "모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다. 의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 국무회의는 대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다. 감사원의 조직·직무범위·감사위원의 자격·감사대상공무원의 범위 기타 필요한 사항은 법률로 정한다. 국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 국회의원이 회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가 있으면 회기중 석방된다. 국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
                "styles": {},
            }
        ],
        "children": [],
    },
    {
        "id": "fa0d5a13-aa52-459e-8b56-284c4081a728",
        "type": "paragraph",
        "props": {
            "textColor": "default",
            "backgroundColor": "default",
            "textAlignment": "left",
        },
        "content": [],
        "children": [],
    },
]
title = "source 생성 테스트"


def generate_unique_chunk_id():
    return str(uuid.uuid4())


# content가 사전 형태의 리스트이므로 JSON 파싱 필요 없음
data = content

# "type"이 "paragraph", "mention", "heading"인 객체들의 "text" 속성을 이어붙일 문자열 초기화
result_text = ""


data = json.loads(content)


def extract_text(content):
    """Recursively extracts text from the content field."""
    if isinstance(content, dict):
        if "type" in content and content["type"] == "text" and "text" in content:
            return content["text"].strip()
        else:
            return " ".join(extract_text(item) for item in content.values())
    elif isinstance(content, list):
        return " ".join(extract_text(item) for item in content)
    else:
        return " "


# Extracting all the text
# all_text = "".join(extract_text(item) for item in data)
all_text = "".join(extract_text(item) + " " for item in data).strip()

print(all_text)

result_text = title + " " + all_text

print("파싱 완료 문자열 : ", result_text)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
    is_separator_regex=False,
)

item1_text_chunks = text_splitter.split_text(result_text)


for index, chunk in enumerate(item1_text_chunks):
    chunkText = chunk
    chunkId = generate_unique_chunk_id()

    merge_chunk_node_query = """
    MERGE (mergedChunk:Chunks {chunkId: $chunkId})
        ON CREATE SET
            mergedChunk.text = $chunkText
            mergedChunk.source = $postId + $title
        WITH mergedChunk
            MATCH (p:Post) WHERE ID(p) = $postId
            MERGE (mergedChunk)-[:EMBED]->(p)
    RETURN ID(mergedChunk)
    """

    # Neo4j 그래프 초기화
    kg = Neo4jGraph(
        url=NEO4J_URI,
        username=NEO4J_USERNAME,
        password=NEO4J_PASSWORD,
        database=NEO4J_DATABASE,
    )

    generatedChunkId = kg.query(
        merge_chunk_node_query,
        params={
            "chunkId": chunkId,
            "chunkText": chunkText,
            "postId": starPostId,
            "title": title,
        },
    )

    print("생성된 노드 ID : ", generatedChunkId[0])

    merged_chunk_value = generatedChunkId[0].get("ID(mergedChunk)")

    kg.query(
        """
    CREATE CONSTRAINT unique_chunks IF NOT EXISTS 
        FOR (c:Chunks) REQUIRE c.chunkId IS UNIQUE
    """
    )

    # 벡터 인덱스 생성 쿼리
    vector = kg.query(
        """
        CREATE VECTOR INDEX `embeddedPosts` IF NOT EXISTS
        FOR (c:Chunks) ON (c.textEmbeddings)
        OPTIONS { indexConfig: {
            `vector.dimensions`: 1536,
            `vector.similarity_function`: 'cosine'    
        }}
    """
    )

    print("인덱스 생성 쿼리", kg.query("SHOW INDEXES"))

    print("벡터 인덱스 생성 완료")

    # 벡터 인코딩 및 노드 연결 쿼리
    kg.query(
        """
        MATCH (chunks:Chunks) WHERE ID(chunks) = $chunkId
        WITH chunks, genai.vector.encode(
            chunks.text, 
            "OpenAI", 
            {
                token: $openAiApiKey, 
                endpoint: $openAiEndpoint
            }) AS vector
        CALL db.create.setNodeVectorProperty(chunks, "textEmbeddings", vector)
    """,
        params={
            "openAiApiKey": OPENAI_API_KEY,
            "openAiEndpoint": OPENAI_BASE_URL,
            "chunkId": merged_chunk_value,
        },
    )

    # 결과 출력
    print("결과 : ", chunk)
