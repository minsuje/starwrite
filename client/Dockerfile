# nginx 이미지 사용
FROM nginx:latest

# root에 /app 폴더 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# WORK dir에 dist 폴더 생성
RUN mkdir ./dist

# host Pc의 현재 경로의 build 폴더를 work dir의 build 폴더로 복사
ADD ./dist ./dist

# nginx의 default.conf 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc의 Nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 80포트 개방
EXPOSE 880포트
# container 실행 시 자동으로 실행할 command. nginx 시작
CMD ["nginx" , "-g", "daemon off;"]

