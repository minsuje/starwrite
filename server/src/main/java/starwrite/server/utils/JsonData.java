package starwrite.server.utils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
class JsonItem {
  public String type;
  public List<Content> content;

  @JsonIgnoreProperties(ignoreUnknown = true)
  static class Content {
    public String text;
  }
}

public class JsonData {

  public static String parseJson(String jsonStr) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    List<JsonItem> items = mapper.readValue(jsonStr, new TypeReference<List<JsonItem>>() {});

    StringBuilder parsedContent = new StringBuilder();
    for (JsonItem item : items) {
      if ("heading".equals(item.type) || "paragraph".equals(item.type) || "mention".equals(item.type)) {
        for (JsonItem.Content content : item.content) {
          if (content.text != null && !content.text.trim().isEmpty()) {
            parsedContent.append(content.text).append(" ");
          }
        }
      }
    }
    return parsedContent.toString().trim();
  }
}
