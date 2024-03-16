package starwrite.server.response;

import java.util.List;
import lombok.Data;
import starwrite.server.entity.Post;
import starwrite.server.relationship.Related;

@Data
public class GetCategoryPosts {
  private Post posts;
  private Related related;
}
