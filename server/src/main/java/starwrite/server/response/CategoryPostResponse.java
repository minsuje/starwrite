package starwrite.server.response;

import java.util.List;
import lombok.Data;

@Data
public class CategoryPostResponse {
  private String categoryName;
  private List<CategoryPosts> categoryPosts;
}
