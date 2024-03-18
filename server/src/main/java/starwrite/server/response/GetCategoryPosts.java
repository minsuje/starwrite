package starwrite.server.response;

import java.util.List;
import lombok.Data;
import starwrite.server.entity.Post;
import starwrite.server.relationship.Related;

@Data
public class GetCategoryPosts {

  private Post post;

  private Long postId;

//  private String postTitle;

  private Long relatedPostId;

//  private String relatedPostTitle;

//  private Boolean relatedBack;
}
