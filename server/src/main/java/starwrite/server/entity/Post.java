package starwrite.server.entity;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;


import java.time.LocalDateTime;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Post")
public class Post {
    @Id
    @GeneratedValue
    private Long postId;

    private String title;

    private String content;

    private String img;

    private boolean state;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Relationship(type = "RELATED", direction = Direction.OUTGOING)
    private List<Post> relatedPost;

    @Relationship(type = "IS_CHILD", direction = Direction.INCOMING)
    private Category category;
}
