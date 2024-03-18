package starwrite.server.entity;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Annotation")
public class Annotation {

  @Id
  @GeneratedValue(generatorClass = UUIDStringGenerator.class)
  private String id;

  private Integer position;

  private String content;

  private boolean isWriter;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @Relationship(type = "COMMENT", direction = Direction.INCOMING)
  private Post post;

  @Relationship(type = "COMMENT", direction = Direction.INCOMING)
  private Users user;

  @Relationship(type = "REPLY", direction = Direction.INCOMING)
  private Annotation parent;
}
