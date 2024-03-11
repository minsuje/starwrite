package starwrite.server.request;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;

public class CreatePostRequest {
  private String title;

  private String content;

  private String img;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  private List<Post> relatedPost;

  private Category category;

}
