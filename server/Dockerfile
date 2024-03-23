# # Dockerfile
#
# # jdk17 Image Start
# FROM openjdk:17 AS builder
# WORKDIR application
# # 인자 설정 - JAR_File
# ARG JAR_FILE=build/libs/*.jar
# # jar 파일 복제
# COPY ${JAR_FILE} app.jar
# # RUN java -Djarmode=layertools -jar app.jar extract
# RUN java -jar app.jar extract
#
# # 인자 설정 부분과 jar 파일 복제 부분 합쳐서 진행해도 무방
# #COPY build/libs/*.jar app.jar
#
# # 포트 EXPOSE
# EXPOSE 8080
#
# # 실행 명령어
#
# FROM openjdk:17
#
# WORKDIR application
# ENV spring.profiles.active=dev
# COPY --from=builder application/dependencies ./
# COPY --from=builder application/spring-boot-loader ./
# COPY --from=builder application/snapshot-dependencies ./
# COPY --from=builder application/application ./
#
# ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]



#
# # jdk17 Image Start
# FROM openjdk:17 AS builder
#
# # 작업 디렉토리 설정
# WORKDIR application
#
# # 인자 설정 - JAR_File
# ARG JAR_FILE=build/libs/*.jar
#
# # jar 파일 복제
# COPY ${JAR_FILE} app.jar
#
# # 포트 EXPOSE
# EXPOSE 8080
#
# # 환경 변수 설정
#
# WORKDIR application
# ENV spring.profiles.active=dev
# COPY --from=builder application/dependencies ./
# COPY --from=builder application/spring-boot-loader ./
# COPY --from=builder application/snapshot-dependencies ./
# COPY --from=builder application/application ./
#
# ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]

# Step 1: Use an official Gradle image as the base image
FROM gradle:jdk17 as builder

# Set the working directory inside the container
WORKDIR /home/gradle/project

# Copy the Gradle configuration files into the container
COPY --chown=gradle:gradle build.gradle settings.gradle /home/gradle/project/

# Copy the project source into the container
COPY --chown=gradle:gradle src /home/gradle/project/src

# Build the project
RUN gradle build --no-daemon

# Step 2: Use an OpenJDK image to run the compiled application
FROM openjdk:17-slim

# Set a directory for the app
WORKDIR /app

# Copy the compiled jar file from the builder stage into the app directory
COPY --from=builder /home/gradle/project/build/libs/*.jar /app/spring-boot-application.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/spring-boot-application.jar"]
