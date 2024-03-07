package starwrite.server.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Posts;

@Repository
public interface PostsRepository extends Neo4jRepository<Posts, Long> {

}
