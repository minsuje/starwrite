package starwrite.server.response;

import java.util.List;
import lombok.Data;
import starwrite.server.entity.Post;

@Data
public class CreatePost {
  private Post post;
  private String category;
  private String user;
  private List<String> relatedPosts;
}
