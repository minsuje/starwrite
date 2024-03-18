package starwrite.server.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import starwrite.server.entity.Annotation;

@Data
public class CreateAnnotation {
  private Annotation annotation;

  private Long postId;

  private String userId;

}
