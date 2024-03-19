package starwrite.server.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import starwrite.server.entity.Annotation;
import starwrite.server.entity.Post;

@Data
public class PostDetail {
  private Long postIdentifier;

  private String title;

  private String content;

  private String visible;

  private String img;

  private boolean tmpSave;

  private LocalDateTime recentView;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  private String authorUserId;

  private String authorNickname;

  private String categoryId;

  private List<Annotation> annotations;
}
