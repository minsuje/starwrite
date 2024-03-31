# 버전
FROM node:21.2.0

# 경로 설정하기
WORKDIR /app


COPY package.json package-lock.json ./
# 설치
RUN npm install 
COPY . ./
EXPOSE 3000

# React 애플리케이션을 빌드합니다.
RUN npm run dev

# npm start 스크립트 실행
CMD ["npm", "run", "dev"]