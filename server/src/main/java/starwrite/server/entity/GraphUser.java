package starwrite.server.entity;

import java.time.LocalDateTime;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("GraphUser")
public class GraphUser {
    @Id
    @GeneratedValue
    private Long id;

    private String username;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
