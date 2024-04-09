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
<img src="https://img.shields.io/badge/D3-F9A03C.svg?style=for-the-badge&logo=d3dotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Zod-3E67B1.svg?style=for-the-badge&logo=zod&logoColor=white" /> <img src="https://img.shields.io/badge/ReactHookForm-EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white" /> <img src="https://img.shields.io/badge/blocknote-black.svg?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iOTEiIGhlaWdodD0iODgiIHZpZXdCb3g9IjAgMCA5MSA4OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTg2LjIwOTggNTAuMjkwN0w3MS4wNDI4IDQxLjUzNEM3MC4wNDggNDAuOTU5NyA2OS43MDk5IDQxLjE1NDkgNjkuNzA5OSA0Mi4zMDM2VjQ2Ljk2MTFDNjkuNzA5OSA0OC4yNDU5IDcwLjM5NTMgNDkuNDMzIDcxLjUwNzkgNTAuMDc1M0w4Mi42Mjc2IDU2LjQ5NTNDODMuMjUzNCA1Ni44NTY2IDgzLjY0MiA1Ny41Mjk5IDgzLjY0MjEgNTguMjUyN1Y2OC42OTA4TDY1LjgzMjEgNTguNDA4Mkw2NS44MzIgNDAuNTkzOEw2NS44MzE5IDE1Ljg5MTFDNjUuODMxOSAxMi42MTY3IDY0LjA3MDUgOS41NjYwMSA2MS4yMzUyIDcuOTI5MjNMNDkuNjI3OCAxLjIyNzdDNDYuNzkyNCAtMC40MDkwMiA0My4yNjk1IC0wLjQwOTQ0OCA0MC40MzQyIDEuMjI3N0wyOC44MjY2IDcuOTI5MjNDMjUuOTgyMSA5LjU3MTUxIDI0LjIyOTggMTIuNjA2NiAyNC4yMjk4IDE1Ljg5MTJWMzIuNTA5QzI0LjIyOTggMzMuNjU3NyAyNC41Njc5IDMzLjg1MjkgMjUuNTYyNyAzMy4yNzg1TDI5LjU5NjMgMzAuOTQ5N0MzMC43MDg4IDMwLjMwNzQgMzEuMzk0MiAyOS4xMjAzIDMxLjM5NDIgMjcuODM1NVYxNS44OTExQzMxLjM5NDIgMTUuMTY4NSAzMS43ODMgMTQuNDk1MyAzMi40MDkgMTQuMTMzOUw0MS40NDg3IDguOTE0NzFMNDEuNDQ4OCAyOC41ODQ0TDI2LjAyMSAzNy40OTE1TDUuNDAzNDQgNDkuMzk1M0MyLjU2Nzc0IDUxLjAzMjUgMC44MDY0NTggNTQuMDgzMyAwLjgwNjY0MSA1Ny4zNTcxVjcwLjc2MDJDMC44MDY4MjUgNzQuMDM0IDIuNTY3OTMgNzcuMDg1MiA1LjQwMzQ0IDc4LjcyMjFMMTcuMDEwOCA4NS40MjM3QzE5Ljg1NTQgODcuMDY2MSAyMy4zNTk5IDg3LjA2NjEgMjYuMjA0NSA4NS40MjM4TDM5LjgyMDMgNzcuNTYyNkM0MC44MTUxIDc2Ljk4ODMgNDAuODE1MSA3Ni41OTc5IDM5LjgyMDMgNzYuMDIzNkwzNS43ODY4IDczLjY5NDhDMzQuNjc0MiA3My4wNTI1IDMzLjMwMzQgNzMuMDUyNSAzMi4xOTA4IDczLjY5NDhMMjIuNjIyMiA3OS4yMTkyQzIxLjk5NjQgNzkuNTgwNSAyMS4yMTkgNzkuNTgwNSAyMC41OTMgNzkuMjE5MUwxMS41NTMyIDczLjk5OTlMMjcuODEyMiA2NC42MTI4TDQzLjIzOTkgNzMuNTJMNjUuNDA4OCA4Ni4zMTkyQzY4LjI0NDUgODcuOTU2NCA3MS43NjcyIDg3Ljk1NjMgNzQuNjAyMyA4Ni4zMTkyTDg2LjIwOTcgNzkuNjE3N0M4OS4wNDQ4IDc3Ljk4MDYgOTAuODA2NyA3NC45Mjk4IDkwLjgwNjUgNzEuNjU1OEw5MC44MDY2IDU4LjI1MjZDOTAuODA2NiA1NC45NjgxIDg5LjA1NDMgNTEuOTMzIDg2LjIwOTggNTAuMjkwN1pNNzEuMDE5NyA4MC4xMTQ4QzcwLjM5NDMgODAuNDc1OSA2OS42MTY4IDgwLjQ3NiA2OC45OTEgODAuMTE0Nkw0Ni44MjIxIDY3LjMxNTRMMzEuMzk0NCA1OC40MDgyVjQ4LjY3ODlDMzEuMzk0NCA0Ny41MzAzIDMxLjA1NjMgNDcuMzM1MSAzMC4wNjE1IDQ3LjkwOTRMMjYuMDI4IDUwLjIzODJDMjQuOTE1NCA1MC44ODA2IDI0LjIzIDUyLjA2NzcgMjQuMjMgNTMuMzUyNFY1OC40MDgyTDcuOTcxMDcgNjcuNzk1Mkw3Ljk3MTE5IDU3LjM1NjhDNy45NzExOSA1Ni42MzQ2IDguMzU5ODYgNTUuOTYxMiA4Ljk4NTY1IDU1LjU5OTlMMzEuMTU0NSA0Mi44MDA3TDQ1LjAzMSAzNC43ODlMNTMuNDU2OSAzOS42NTM2QzU0LjQ1MTYgNDAuMjI3OSA1NC43ODk4IDQwLjAzMjcgNTQuNzg5OCAzOC44ODQxVjM0LjIyNjVDNTQuNzg5OCAzMi45NDE3IDU0LjEwNDMgMzEuNzU0NiA1Mi45OTE3IDMxLjExMjNMNDguNjEzMiAyOC41ODQzVjguOTE0NzFMNTcuNjUzMiAxNC4xMzQxQzU4LjI3ODYgMTQuNDk1MiA1OC42Njc1IDE1LjE2ODUgNTguNjY3NSAxNS44OTExVjQxLjQ4OTZMNTguNjY3NyA1OC40MDgzTDUwLjI0MTkgNjMuMjcyOUM0OS4yNDcxIDYzLjg0NzMgNDkuMjQ3MSA2NC4yMzc2IDUwLjI0MTkgNjQuODEyTDU0LjI3NTUgNjcuMTQwOEM1NS4zODgxIDY3Ljc4MzEgNTYuNzU4OCA2Ny43ODMxIDU3Ljg3MTQgNjcuMTQwN0w2Mi4yNDk5IDY0LjYxMjhMODAuMDYgNzQuODk1NUw3MS4wMTk3IDgwLjExNDhaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTUyM18xMzcxKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzE1MjNfMTM3MSIgeDE9Ijc2LjUxMDEiIHkxPSIxMS4wNjEyIiB4Mj0iMjguNjI0MiIgeTI9IjkzLjUzMTMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRUJFNyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2OTIzQkEiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K" />

**NPM** <br>
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white" />
<img src="https://img.shields.io/badge/styledComponents-DB7093.svg?style=for-the-badge&logo=styledcomponents&logoColor=white" />
<img src="https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=redux&logoColor=white" />

<br><br>

### # Back-end

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/JWT-000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white" /> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white"> <img src="https://img.shields.io/badge/neo4j-4581C3.svg?style=for-the-badge&logo=neo4j&logoColor=white" /> <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">

**DevOps** <br>
<img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/jenkins-D24939.svg?style=for-the-badge&logo=jenkins&logoColor=white" /> <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white"> <img src="https://img.shields.io/badge/Amazon%20API%20Gateway-FF4F8B.svg?style=for-the-badge&logo=amazonapigateway&logoColor=white" /> <img src="https://img.shields.io/badge/Amazon%20Lambda-FF9900.svg?style=for-the-badge&logo=awslambda&logoColor=white" /> <img src="https://img.shields.io/badge/amazon%20ecr-orange.svg?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNzQiIHZpZXdCb3g9IjAgMCA2NSA3NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYxLjMzMzMgMjcuMDc5NFY1NC4zNDZMMzcuMzMzMyA2OC4yMTI3VjU3Ljg2NjFMNTAuNjY2NyA1MC4xNzI3QzUxLjAyMzQgNDkuOTcyMyA1MS4zMjkxIDQ5LjY5MjQgNTEuNTYwNCA0OS4zNTQ5QzUxLjc5MTYgNDkuMDE3MyA1MS45NDIgNDguNjMxMSA1MiA0OC4yMjZDNTIuMDI3MSA0Ny44Nzk5IDUyLjAyNzEgNDcuNTMyMiA1MiA0Ny4xODZWMzIuMDEyN0w2MS4zMzMzIDI2LjY3OTRWMjcuMDc5NFpNNjMuMjEzMyAyMi42Nzk0QzYzLjA3ODYgMjIuNjc2OSA2Mi45NDU0IDIyLjcwOSA2Mi44MjY3IDIyLjc3MjdMNTAuMDkzMyAzMC4xMzI3QzQ5Ljg1MzMgMzAuMjY2IDQ5LjMzMzMgMzAuNTA2MSA0OS4zMzMzIDMwLjgxMjdWNDcuMTg2QzQ5LjM0NzggNDcuNDEyNSA0OS4zNDc4IDQ3LjYzOTYgNDkuMzMzMyA0Ny44NjYxTDM1LjA2NjcgNTYuMDkyN0MzNC45NDk0IDU2LjE2MzUgMzQuODUyMyA1Ni4yNjMyIDM0Ljc4NDYgNTYuMzgyMkMzNC43MTY5IDU2LjUwMTMgMzQuNjgwOSA1Ni42MzU4IDM0LjY4IDU2Ljc3MjdWNzEuNDM5NEMzNC42OCA3MS41NDI3IDM0LjcwMDQgNzEuNjQ1IDM0LjczOTkgNzEuNzQwNEMzNC43Nzk0IDcxLjgzNTkgMzQuODM3NCA3MS45MjI2IDM0LjkxMDQgNzEuOTk1NkMzNC45ODM1IDcyLjA2ODcgMzUuMDcwMiA3Mi4xMjY2IDM1LjE2NTYgNzIuMTY2MkMzNS4yNjExIDcyLjIwNTcgMzUuMzYzNCA3Mi4yMjYgMzUuNDY2NyA3Mi4yMjZDMzUuNjAyNSA3Mi4yMjM5IDM1LjczNTYgNzIuMTg3MiAzNS44NTMzIDcyLjExOTRMNjMuNjI2NyA1Ni4xMTk0QzYzLjc0MzkgNTYuMDQ4NiA2My44NDExIDU1Ljk0ODkgNjMuOTA4OCA1NS44Mjk5QzYzLjk3NjUgNTUuNzEwOCA2NC4wMTI1IDU1LjU3NjQgNjQuMDEzMyA1NS40Mzk0VjIzLjM1OTRDNjQuMDEzMyAyMy4yNTY3IDYzLjk5MjkgMjMuMTU1IDYzLjk1MzIgMjMuMDYwM0M2My45MTM1IDIyLjk2NTYgNjMuODU1NCAyMi44Nzk4IDYzLjc4MjEgMjIuODA3OEM2My43MDg5IDIyLjczNTggNjMuNjIyMSAyMi42NzkxIDYzLjUyNjcgMjIuNjQxQzYzLjQzMTMgMjIuNjAzIDYzLjMyOTMgMjIuNTg0MyA2My4yMjY3IDIyLjU4NjFMNjMuMjEzMyAyMi42Nzk0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI5Ljg5MzMgNzMuNTg2QzI5LjUyMzcgNzMuNTg2NyAyOS4xNjA1IDczLjQ5MDIgMjguODQgNzMuMzA2TDEuMDUzMzMgNTcuMzA2QzAuNzMyNzUyIDU3LjEyMDkgMC40NjY1OTkgNTYuODU0NyAwLjI4MTY4MSA1Ni41MzRDMC4wOTY3NjI3IDU2LjIxMzMgLTAuMDAwMzkyMjYzIDU1Ljg0OTUgMS4xOTAzZS0wNiA1NS40Nzk0VjIwLjE1OTRDLTAuMDAwMzkyMjYzIDE5Ljc4OTIgMC4wOTY3NjI3IDE5LjQyNTUgMC4yODE2ODEgMTkuMTA0OEMwLjQ2NjU5OSAxOC43ODQxIDAuNzMyNzUyIDE4LjUxNzggMS4wNTMzMyAxOC4zMzI3TDMxLjYxMzMgMC42OTI3MDdDMzEuOTM0MiAwLjUwMjYzMyAzMi4zMDA0IDAuNDAyMzQ0IDMyLjY3MzMgMC40MDIzNDRDMzMuMDQ2MyAwLjQwMjM0NCAzMy40MTI0IDAuNTAyNjMzIDMzLjczMzMgMC42OTI3MDdMNjEuNTA2NyAxNi42OTI3QzYxLjgyNjMgMTYuODc4OCA2Mi4wOTE4IDE3LjE0NTMgNjIuMjc2NSAxNy40NjU4QzYyLjQ2MTMgMTcuNzg2MiA2Mi41NTkgMTguMTQ5NSA2Mi41NiAxOC41MTk0QzYyLjU1ODcgMTguODkxIDYyLjQ2MSAxOS4yNTYgNjIuMjc2MyAxOS41Nzg1QzYyLjA5MTcgMTkuOTAxIDYxLjgyNjUgMjAuMTcwMSA2MS41MDY3IDIwLjM1OTRMMzIgMzcuNDI2VjcxLjQ3OTRDMzIuMDAzMSA3MS44NTAxIDMxLjkwNzIgNzIuMjE0OSAzMS43MjIgNzIuNTM2MUMzMS41MzY4IDcyLjg1NzIgMzEuMjY5MSA3My4xMjMxIDMwLjk0NjcgNzMuMzA2QzMwLjYyNjIgNzMuNDkwMiAzMC4yNjI5IDczLjU4NjcgMjkuODkzMyA3My41ODZWNzMuNTg2Wk0yLjY2NjY3IDU1LjExOTRMMjkuMzMzMyA3MC41MDZWMzcuMTA2QzI5LjMzMzMgMzYuNzM0MSAyOS40MzA1IDM2LjM2ODcgMjkuNjE1MiAzNi4wNDU5QzI5LjggMzUuNzIzMiAzMC4wNjU5IDM1LjQ1NDMgMzAuMzg2NyAzNS4yNjZMNTkuMzMzMyAxOC41NzI3TDMyLjY2NjcgMy4xNzI3MUwyLjY4IDIwLjUwNkwyLjY2NjY3IDU1LjExOTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" /> <img src="https://img.shields.io/badge/Redis-DC382D.svg?style=for-the-badge&logo=redis&logoColor=white" /> <img src="https://img.shields.io/badge/OpenAI-412991.svg?style=for-the-badge&logo=openai&logoColor=white" />

<br><br><br>

## 💡 주요 기능

| 기능 | 내용 |
| --- | --- |
| 블록 기반 편집 및 백링크 기능 제공 | 텍스트, 링크, 리스트  등 다양한 유형의 콘텐츠를 개별 블록으로 추가,삭제 가능하며 @기호를 이용하여 자신의 문서를 연결하도록 기능을 제공합니다. |
| 문서 데이터 시각화 | 복잡한 문서 데이터를 한눈에 보기 편하도록 데이터를 시각화 시키며, 사용자는 이를 통해 정보의 흐름, 데이터의 구조를 직관적으로 파악할 수 있으며, 줌인/줌아웃, 드래그등 기능을 제공합니다. |
| AI기반 문서 검색 | 사용자가 보유한 문서 데이터가 대량일 경우 관련성이 높은 문서를 신속하게 찾아드리는 AI기반 문서 검색 서비스 기능 제공합니다. |
| 문서간 연결 시각화 | 글 생성시 @기호를 입력하면 내 워크 스페이스의 모든 글 중에서 연결할 글을 선택할 수 있습니다. 글 조회시 해당 부분을 클릭하면 연결된 글로 이동합니다. |
| 카테고리 생성/수정/삭제 | 카테고리를 생성하여 글을 분류해놓을 수 있습니다. 카테고리는 생성 후에도 수정과 삭제가 가능합니다. |
| 게시글 생성 | 특정 카테고리 안에서 사용자는 자신의 생각을 작성할 수 있는 기능을 제공합니다. |
| 스크랩 기능 | 다른 사용자의 게시글을 내 카테고리로 가져오는 기능을 제공하여 유저간 글을 공유 할 수 있는 기능을 제공합니다. 유저의 지적 재산권을 보장하기 위해 스크랩해온 글들은 노란색 별 모양으로 표시했으며, 스크랩을 제공한 유저의 글은 노란색 원형의 공을 스크랩 제공한 만큼 생성해 줍니다. |
| 일반 검색 | 자신의 카테고리 안에서 검색 기능 제공하여 해당하는 글들에 반짝이는 애니메이션을 제공하여 사용자가 작성한 글을 좀더 쉽게 파악할 수 있는 기능을 제공합니다 |
| 전체 검색 | 전체 검색을 통한 다양한 유저들의 게시글을 검색할 수 있습니다. 이러한 검색을 통해 모든사람의 게시글을 쉽게 찾으며 스크랩을 할 수 있도록 기능을 제공합니다. |
| 리마인드 기능 | 망각곡선의 자료를 이용하여 게시글을 오랫동안 조회를 안하게 되면 별이 점점 흐릿해 집니다. 조회날짜가 최근일자로 변경되면 별의 색상은 다시 밝게 빛나도록 사용자들에게 UI를 제공합니다. 이를통하여 사용자들에게 리마인드를 할 수 있는 기능을 제공합니다. |

<br><br><br>

## 📂 프로젝트 구성도

| 아키텍처 (Architecture) | 
| --- |
| |

| 개체 관계 모델 (ERD) | 
| --- |
| |

| 클라이언트 폴더 구조 | 
| --- |
| |








