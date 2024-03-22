# Dockerfile

# jdk17 Image Start
FROM openjdk:17 AS builder
WORKDIR application
# 인자 설정 - JAR_File
ARG JAR_FILE=build/libs/*.jar
# jar 파일 복제
COPY ${JAR_FILE} app.jar
RUN java -Djarmode=layertools -jar app.jar extract

# 인자 설정 부분과 jar 파일 복제 부분 합쳐서 진행해도 무방
#COPY build/libs/*.jar app.jar

# 포트 EXPOSE
EXPOSE 8080

# 실행 명령어

FROM openjdk:17

WORKDIR application
ENV spring.profiles.active=dev
COPY --from=builder application/dependencies ./
COPY --from=builder application/spring-boot-loader ./
COPY --from=builder application/snapshot-dependencies ./
COPY --from=builder application/application ./

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]