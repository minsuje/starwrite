package starwrite.server.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;

@Data
// post 정보와 relationShip 타입만 가져오기
public class GetPosts {
//  private List<Post> post;
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
  private boolean scrap;
  private String originAuthor;
  private String originAuthorId;
}
