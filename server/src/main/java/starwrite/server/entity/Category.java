package starwrite.server.entity;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
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

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
