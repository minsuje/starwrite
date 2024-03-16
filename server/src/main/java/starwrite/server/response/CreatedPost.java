package starwrite.server.response;

import lombok.Data;
import starwrite.server.entity.Post;

@Data
public class CreatedPost {
    private Post post;

    private Long identifier;

}
