package starwrite.server.entity;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Post")
public class Post {

    @Id
    @GeneratedValue(generatorClass = UUIDStringGenerator.class)
    private String postId;

    private String title;

    private String content;

    private String visible;

    private String img;

    private boolean tmpSave;

    private LocalDateTime recentView;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Relationship(type = "IS_CHILD", direction = Direction.INCOMING)
    private Category category;

    @Relationship(type = "POSTED", direction = Direction.INCOMING)
    private Users users;

}