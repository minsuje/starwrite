package starwrite.server.entity;

import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Category")
public class Category {
    @Id
    @GeneratedValue
    private String categoryId;

    String name;

    String owner;

    int postCnt;

    LocalDateTime createdAt = LocalDateTime.now();

    LocalDateTime updatedAt = createdAt;

//    @Relationship (type = "POSTED", direction = Relationship.Direction.INCOMING)
    private List<Posts> posts = new ArrayList<>();


}