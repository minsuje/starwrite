package starwrite.server.response;

import java.util.List;
import lombok.Data;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;

@Data
public class GetPosts {
  private List<Post> post;
  private String relationType;
}
