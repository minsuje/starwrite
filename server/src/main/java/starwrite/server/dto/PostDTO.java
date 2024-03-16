package starwrite.server.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

  private LocalDateTime recentView;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @Relationship(type = "IS_CHILD", direction = Direction.INCOMING)
  private Category category;

  @Relationship(type = "POSTED", direction = Direction.INCOMING)
  private Users users;

  private List<String> postRelate;
}
