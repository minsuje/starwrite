package starwrite.server.dto;

import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;

@Data
public class PostDTO extends Post {
  private String postId;

  private String title;

  private String content;

  private String visible;

  private String img;

  private boolean tmpSave;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  private Category category;

  private Users users;
}
