package starwrite.server.dto;

import java.util.List;
import lombok.Data;

@Data
public class PostRelationDTO {
  private String postId;
  private List<String> relatedPostId;
}
