package starwrite.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Category")
public class Category {
    @Id
    @GeneratedValue
    Long id;
    String name;
    String owner;
    String post_cnt;
    String created_at;
    String updated_at;
}
