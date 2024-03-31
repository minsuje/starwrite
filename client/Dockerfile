# 버전
FROM node:21.2.0 AS build

# 경로 설정하기
WORKDIR /src/app

COPY package.json package-lock.json ./
# 설치
RUN npm install

COPY . .

RUN npm run build


FROM nginx
# COPY --from=builder /src/app/build /usr/share/nginx/html

COPY conf /etc/nginx

COPY --from=builder /app/build /usr/share/nginx/html



EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]