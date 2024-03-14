package starwrite.server.response;

import java.util.List;
import lombok.Data;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;

@Data
// post 정보와 relationShip 타입만 가져오기
public class GetPosts {
  private List<Post> post;
  private String categoryRelationType;
  private String usersRelationType;
}
