package starwrite.server.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import starwrite.server.entity.Post;

public interface PostRepository extends Neo4jRepository<Post, Long> {

}
