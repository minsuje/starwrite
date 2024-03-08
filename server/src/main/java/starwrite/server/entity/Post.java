
package starwrite.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("post")
public class Post {
    @Id
    @GeneratedValue
    Long id;
    String writer;
    String holder;
    String content;
    LocalDateTime createdAt = LocalDateTime.now();
    LocalDateTime updatedAt = createdAt;
}
