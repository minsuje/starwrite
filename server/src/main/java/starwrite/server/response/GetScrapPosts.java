package starwrite.server.response;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class GetScrapPosts {
  private Long postIdentifier;
  private String postTitle;
  private String content;
  private String visible;
  private String img;
  private LocalDateTime recentView;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  private String categoryId;
  private String categoryName;
  private String userId;
  private String userNickname;
  private String originAuthor;
  private String originAuthorId;
}


