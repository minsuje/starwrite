package starwrite.server.request;

import lombok.Data;

@Data
public class ScrapPost {
  private Long postId;
  private String category;
}
