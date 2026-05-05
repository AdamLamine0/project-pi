FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /workspace
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre-jammy

RUN apt-get update \
    && apt-get install -y --no-install-recommends tesseract-ocr tesseract-ocr-eng tesseract-ocr-fra \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV APP_AI_OCR_DATA_PATH=/usr/share/tesseract-ocr/5/tessdata
COPY --from=build /workspace/target/*.jar app.jar

EXPOSE 8092
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
