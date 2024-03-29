package starwrite.server.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class PostTitleDTO {
  private String title;
  private Long postId;
  private LocalDateTime recentView;
  private String categoryId;
  private String categoryName;
  private boolean scrap;
  private Long numberOfRelations;
}
