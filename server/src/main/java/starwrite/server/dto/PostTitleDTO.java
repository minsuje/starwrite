package starwrite.server.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class PostTitleDTO {
  private String title;
  private Long postId;
  private LocalDateTime recentView;
}
