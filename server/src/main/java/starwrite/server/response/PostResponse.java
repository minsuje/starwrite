package starwrite.server.response;

import java.util.List;
import lombok.Data;
import org.apache.catalina.User;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;
import starwrite.server.relationship.Owns;

@Data
public class PostResponse {
//    private String userId;
//    private String relationType;
//    private String categoryId;
  private Users userId;
  private String relationType;
  private List<Category> category;
  private List<Post> post;
}
