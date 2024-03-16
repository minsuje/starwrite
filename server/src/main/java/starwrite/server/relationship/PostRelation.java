package starwrite.server.relationship;

import java.util.List;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;
import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import starwrite.server.entity.Post;

@RelationshipProperties
public class PostRelation {
    @RelationshipId
    @GeneratedValue
    private String relationShipId;

    @Relationship(type = "MENTION", direction = Direction.OUTGOING)
    private List<Post> postId;
}
