package starwrite.server.relationship;

import java.lang.annotation.Target;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;
import starwrite.server.entity.Users;

@Data
@RelationshipProperties
public class Owns {
  @Id
  @GeneratedValue
  private String ownsId;

  @TargetNode
  @Property
  private final Users users;

//  @Property
//  private Users users2;
}
