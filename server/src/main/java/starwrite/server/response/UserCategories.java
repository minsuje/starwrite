package starwrite.server.response;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class UserCategories {
  private String name;
  private String categoryId;
  private LocalDateTime createdAt;
  private Integer postCount;
}
