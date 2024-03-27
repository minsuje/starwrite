package starwrite.server.response;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CategoryPosts {
  private Long postId;
  private String title;
  private String content;
  private String visible;
  private LocalDateTime recentView;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private String userId;
  private String nickname;
}
