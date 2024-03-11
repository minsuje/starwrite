package starwrite.server.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Post;
import starwrite.server.response.PostResponse;

@Repository
public interface PostRepository extends Neo4jRepository<Post, Long> {

  @Query("MATCH (p:Post) " +
      "MATCH (c:Category)<-[]-(p) " +
      "RETURN p")
  List<Post> findAllPosts();

  @Query("MATCH (c:Category) WHERE ID(c) = $categoryId " +
      "CREATE (p:Post{title: $title,content:$content,category:c,createdAt: localdatetime(), updatedAt: localdatetime()}) " +
      "MERGE (p)-[:IS_CHILD]->(c) " +
      "RETURN p")
  Post createPost(@Param(value = "title") String title, @Param(value = "content") String content, @Param(value = "categoryId") Long categoryId);

  @Query("MATCH (p:Post) WHERE ID(p) = $id RETURN p")
  Post findPostById(Long id);

  @Query("MATCH (p:Post)-[r]-(u:User) WHERE ID(p) = 6 AND ID(u) = 0 RETURN { post: p, relation: r, user: u } AS result")
  PostResponse findPost();
}

