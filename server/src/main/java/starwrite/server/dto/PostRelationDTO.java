package starwrite.server.dto;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;

@Data
@RelationshipProperties
public class PostRelationDTO {

  private String relation;

}
