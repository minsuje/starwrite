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
          "MATCH (u : User) " +
          "MATCH (c:Category)-[]->(p) " +
          "WHERE p.state = true AND ID(u) = $userid AND p.public = true " +
          "RETURN p")
  List<Post> findAllPosts(@Param(value = "userid") Long userid);


  @Query("MATCH (p:Post) " +
          "MATCH (u : User) " +
          "MATCH (c:Category)-[]->(p) " +
          "WHERE p.state = true AND ID(u) = $userid AND u.public = part " +
          "RETURN p")
  List<Post> findPartPosts(@Param(value = "userid") Long userid);


//  @Query("MATCH (p:Post) " +
//          "MATCH (u : User) " +
//          "MATCH (c:Category)-[]->(p) " +
//          "WHERE p.state = true AND ID(u) = $userid AND u.visible = partPub " +
//          "RETURN p")

//  @Query("MATCH (c:Category) WHERE ID(c) = $categoryId " +
//      "CREATE (p:Post{title: $title,content:$content,category:c,createdAt: localdatetime(), updatedAt: localdatetime()}) " +
//      "MERGE (p)-[:IS_CHILD]->(c) " +
//      "RETURN p")
//  Post createPost(String title, String content, Long categoryId);

  @Query("MATCH (p:Post) WHERE ID(p) = $id RETURN p")
  Post findPostById(@Param(value = "id") Long id);

  // 모든 임시 저장 post( All save Post pull )
  @Query("MATCH (c:Category)-[:IS_CHILD]->(p:Post) " +
          "WHERE p.state = false AND ID(p) = $id " +
          "RETURN p")
  List<Post> findSavePost(@Param(value = "id") Long id);

}

