package starwrite.server.dto;

import java.time.LocalDateTime;
import lombok.Data;
import starwrite.server.entity.Post;


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

  private boolean isMine;
}
