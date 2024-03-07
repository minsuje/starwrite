package starwrite.server.entity;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;


import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Posts")
public class Posts {
    @Id
    @GeneratedValue
    private Long id;
    @Relationship(type = "myPost", direction = Relationship.Direction.INCOMING)
    private Long category_id;
    @Column(nullable = false)
    private Long writer;

    @Column(nullable = false)
    private Long holder;

    @Column(nullable = true)
    private String content;

    @Column(nullable = true)
    private String img;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

}
