# STARWRITE

<br><br><br>

## 목차
  1. 웹 서비스 소개
  2. 주제 선정 이유
  3. 기술 스택
  4. 주요 기능
  5. 프로젝트 구성도
  6. 데모 영상
  7. 개발 팀 소개
  8. 개발 기간 및 일정
  9. 실행 방법
      
<br><br><br>

## 💁🏻 웹 서비스 소개
**스타라이트** 는 지식 사이의 연결을 시각화하여 학습을 도와주는 메모 어플리케이션입니다.

지식이 쌓일 때마다 나의 우주가 확장된다는 의미로 나의 워크스페이스는 우주로, 각각의 글은 별로 표현했습니다. 글은 카테고리 별로 나누어 작성할 수 있고 글을 작성하면 해당 카테고리에 흰색별이 생성됩니다. 

글을 작성할 때 내가 이미 작성한 다른 글들과 현재 작성하고 있는 글을 연결지을 수 있습니다. 연결된 글들은 노드뷰에서 선으로 연결되어 어떤 글들이 관련있는지 한눈에 파악할 수 있습니다.

다른 사람의 글을 검색할 수 있습니다. 해당 글을 스크랩하여 나의 워크스페이스로 옮길 수 있습니다. 스크랩한 글은 노드뷰에서 노란색 별로 표현되고 별의 위성의 개수를 통해 내 글을 얼마나 많은 사람들이 스크랩해갔는지 확인할 수 있습니다.

글이 많이 쌓여서 예전에 쓴 글을 찾기 어려울 때는 AI 챗봇의 도움을 받을 수 있습니다. AI 챗봇은 내가 작성한 글을 토대로 질문에 대한 답변을 찾아줍니다. 나의 우주가 커질수록 AI챗봇도 함께 성장해나갑니다.

<br>

📍 '스타라이트' 게스트 계정 정보
<table>
  <tr><td>아이디</td><td>user001@naver.com</td></tr>
  <tr><td>비밀번호</td><td>1q2w3e4r!</td></tr>
</table>
서비스를 구경하고 싶으시다면 상단의 계정 정보로 로그인 후 사용하실 수 있습니다.

<br><br><br>

## 🤷🏻 주제 선정 이유
**‘제텔카스텐’(ZettelKasten)과 ‘세컨브레인(SecondBrain)’**

제텐카스텐은 메모 사이의 연관성을 찾게해주는 메모 작성 기법이고 세컨브레인은 관련된 개념들을 연결지어 마치 우리의 뇌 속 신경망처럼 만드는 지식 관리법입니다.

이런 두 방법론은 연구와 공부를 하는데 도움을 줄 뿐만아니라 우리의 창의성을 끌어올리는데도 좋은 방법으로 알려져있습니다. 그러나 이런 지식관리법에 대해 알고 있더라도 이것을 실천하는 것은 쉽지 않습니다. 어떤 지식을 연결해야하는지, 어떤 지식들이 연결되어 있는지 파악하는 것은 오랜시간이 걸리기 때문입니다. 따라서 우리는 사람들이 지식을 쌓고, 연결하고, 그 과정에서 자신만의 새로운 아이디어를 제시할 수 있으면서도 사용하기 편리하고 원할 때는 AI의 도움을 통해 내가 작성한 내용을 찾을 수 있는 노트 어플리케이션을 제작하고자 했습니다.

<br><br><br>

## 🛠️ 기술 스택

### # Front-end

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>

**BUILD** <br>

<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />

**LIBRARAY** <br>
<img src="https://img.shields.io/badge/D3-F9A03C.svg?style=for-the-badge&logo=d3dotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Zod-3E67B1.svg?style=for-the-badge&logo=zod&logoColor=white" /> <img src="https://img.shields.io/badge/ReactHookForm-EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white" />

**NPM** <br>
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white" />
<img src="https://img.shields.io/badge/styledComponents-DB7093.svg?style=for-the-badge&logo=styledcomponents&logoColor=white" />
<img src="https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=redux&logoColor=white" />

<br><br>

### # Back-end

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/JWT-000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white" /> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white"> <img src="https://img.shields.io/badge/neo4j-4581C3.svg?style=for-the-badge&logo=neo4j&logoColor=white" /> <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">

**DevOps** <br>
<img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/jenkins-D24939.svg?style=for-the-badge&logo=jenkins&logoColor=white" /> <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white"> <img src="https://img.shields.io/badge/Amazon%20API%20Gateway-FF4F8B.svg?style=for-the-badge&logo=amazonapigateway&logoColor=white" /> <img src="https://img.shields.io/badge/Amazon%20Lambda-FF9900.svg?style=for-the-badge&logo=awslambda&logoColor=white" /> <img src="https://img.shields.io/badge/Redis-DC382D.svg?style=for-the-badge&logo=redis&logoColor=white" />













