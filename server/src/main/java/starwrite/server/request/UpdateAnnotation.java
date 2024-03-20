package starwrite.server.request;

import lombok.Data;

@Data
public class UpdateAnnotation {
  private Long annotationId;
  private String content;
}
