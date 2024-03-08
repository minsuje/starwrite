package starwrite.server.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Posts;

@Repository
public interface PostsRepository extends Neo4jRepository<Posts, Long> {
  @Query("MATCH (n:posts{elementId: $categoryId})<-[r:POSTED]-(post:category) RETURN post")
  List<Posts> findPostsById(Long categoryId);



}
