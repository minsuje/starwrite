package starwrite.server.response;

import lombok.Data;
import starwrite.server.entity.Post;

@Data
public class GetPost {
  private Post posted;
}
