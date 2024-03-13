package starwrite.server.dto;

import java.time.LocalDateTime;
import lombok.Data;
import starwrite.server.entity.Category;
import starwrite.server.entity.Users;

@Data
public class Result {
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
  private String relation;

}
