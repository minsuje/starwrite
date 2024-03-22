package starwrite.server.response;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class SearchPosts {
  public Long searchPostId;
  public String title;
  public String content;
  public String userId;
  public String nickName;
  public LocalDateTime createdAt;
}
