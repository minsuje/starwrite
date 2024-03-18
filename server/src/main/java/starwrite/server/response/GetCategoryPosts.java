package starwrite.server.response;

import java.util.List;
import lombok.Data;
import starwrite.server.dto.PostRelatedDTO;
import starwrite.server.dto.PostTitleDTO;
import starwrite.server.entity.Post;
import starwrite.server.relationship.Related;

@Data
public class GetCategoryPosts {

  private List<PostTitleDTO> posts;

//  private String postTitle;

  private List<PostRelatedDTO> relation;

//  private String relatedPostTitle;

//  private Boolean relatedBack;
}
