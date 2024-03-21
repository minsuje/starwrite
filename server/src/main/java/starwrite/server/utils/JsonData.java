package starwrite.server.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;

// JSON 데이터 구조에 맞는 클래스 정의
public class JsonData {
  public List<Content> content;

  public static class Content {
    public String text;
  }

  // JSON 문자열에서 텍스트를 추출하는 메소드
  public static String extractText(String jsonStr) throws IOException {
    ObjectMapper mapper = new ObjectMapper();

    System.out.println("jsonStr >>>>>>>> " + jsonStr);
    List<JsonData> data = mapper.readValue(jsonStr, new TypeReference<List<JsonData>>() {});

    StringBuilder extractedText = new StringBuilder();
    for (JsonData item : data) {
      for (Content content : item.content) {
        extractedText.append(content.text).append(" ");
      }
    }
    return extractedText.toString().trim();
  }
}
