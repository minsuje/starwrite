package starwrite.server.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Post;

@Repository
public interface PostRepository extends Neo4jRepository<Post, Long> {

}
