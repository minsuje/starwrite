package starwrite.server.relationship;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;
import starwrite.server.entity.Post;


@RelationshipProperties
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Related {
  @Id
  @GeneratedValue
  private String id;

  @TargetNode
  private Post relatedPost;

  private String postId;

  private String relatedPostId;

  private Boolean relatedBack;
}
