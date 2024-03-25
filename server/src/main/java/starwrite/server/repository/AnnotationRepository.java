package starwrite.server.repository;

import java.time.LocalDateTime;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Annotation;

@Repository
public interface AnnotationRepository extends Neo4jRepository<Annotation, String> {

  @Query("MATCH (c:Comment) WHERE ID(c) = $id RETURN c")
  Annotation findCommentById(String commentId);


  // 어노테이션 생성
  @Query(
      "MATCH (u:Users), (p:Post) " +
          "WHERE u.userId = $userId AND ID(p) = $postId " +
          "MERGE (a:Annotation {content: $content, type: $type, createdAt: $timeNow, updatedAt: $timeNow, post: $postId, user: $userId}) "
          +
          "MERGE (u)-[:COMMENTED]->(a) " +
          "MERGE (a)-[:COMMENT]->(p) "
  )
  void createAnnotation(@Param(value = "content") String content,
      @Param(value = "type") String type, @Param(value = "timeNow") LocalDateTime timeNow,
      @Param(value = "postId") Long postId,
      @Param(value = "userId") String userId);



  // 어노테이션 수정
  @Query(
      "MATCH (a:Annotation) " +
          "WHERE ID(a) = $annotationId " +
          "SET a.content = $content, a.updatedAt = localDateTime() "
  )
  void updateAnnotation(@Param(value = "id") Long annotationId,
      @Param(value = "content") String content);



  // 어노테이션 삭제
  @Query(
      "MATCH (a:Annotation) " +
          "WHERE ID(a) = $annotationId " +
          "DETACH DELETE a"
  )
  void deleteAnnotation(@Param(value = "id") String annotationId);

}
