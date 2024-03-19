package starwrite.server.response;

import java.util.List;
import lombok.Data;

@Data
public class CategoryDetailResponse {
  private String categoryId;
  private String categoryName;
  private List<CategoryPosts> posts;
}
