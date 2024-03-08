package starwrite.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
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
@Node("Posts")
public class Posts {
    @Id
    @GeneratedValue
    private Long postId;



    @Relationship(type = "POSTED", direction = Relationship.Direction.INCOMING)
    private List<Category> category = new ArrayList<>();

    private Long writer;

    private Long holder;

    private String title;

    private String content;

    private String img;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = createdAt;

}
