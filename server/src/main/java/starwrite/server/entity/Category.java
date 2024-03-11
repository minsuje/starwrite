package starwrite.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Category")
public class Category {

    @Id
    @GeneratedValue
    private Long categoryId;

    private String name;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
