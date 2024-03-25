package starwrite.server.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AnnotationDTO {
  private Long annotationId;

  private String position;

  private String type;

  private String content;

//  private boolean isWriter;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  private String userId;

  private String nickName;

  private Long parentAnnotation;

}
