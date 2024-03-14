package starwrite.server.entity;

import java.time.LocalDateTime;
import java.util.List;
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
@Node("Category")
public class Category {

    @Id
    @GeneratedValue(generatorClass = UUIDStringGenerator.class)
    private String categoryId;

    private String name;

    @Relationship(type = "OWNS", direction = Direction.INCOMING)
    private Users users;

//    @Relationship(type = "IS_CHILD", direction = Direction.OUTGOING)
//    private List<Post> posts;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
