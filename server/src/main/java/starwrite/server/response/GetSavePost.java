package starwrite.server.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import starwrite.server.entity.Post;

@Data
public class GetSavePost {
//  private String title;
//  private String content;
//  private String visible;
//  private String img;
//  private LocalDateTime recentView;
//  private LocalDateTime createdAt;
  private Post posts;
  private Long postid;
  private String usersRelationType;

}
