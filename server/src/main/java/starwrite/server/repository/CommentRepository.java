package starwrite.server.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Annotation;

@Repository
public interface CommentRepository extends Neo4jRepository<Annotation, String> {
  @Query("MATCH (c:Comment) WHERE ID(c) = $id RETURN c")
  Annotation findCommentById(String commentId);
}
