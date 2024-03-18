package starwrite.server.dto;

import lombok.Data;

@Data
public class PostRelatedDTO {
  private Long postId;

  private Long relatedPostId;
}
