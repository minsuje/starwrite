package starwrite.server.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import starwrite.server.dto.PostRelationDTO;
import starwrite.server.entity.Post;

@Repository
public interface PostRepository extends Neo4jRepository<Post, String> {

  // 해당 유저의 공개 비공개글 모두 표시 (All post)
  @Query("MATCH (p:Post) " +
          "MATCH (u : Users) " +
          "MATCH (c:Category)-[r]->(p) " +
          "WHERE p.tmpSave = false AND u.userId = $userId " +
          "RETURN p")
  List<Post> findAllPosts(@Param(value = "userId") String userId);

  @Query("MATCH (c:Category)-[r]->(p:Post) " +
      "MATCH (u: Users) " +
      "WHERE p.tmpSave = false AND u.userId = $userId " +
      "RETURN type(r)"
  )
  List<PostRelationDTO> findRelation(@Param(value = "userId") String userId);




  // 비공개 글을 제외하고 표시 (without pub post)
  @Query("MATCH (p:Post) " +
          "MATCH (u : User) " +
          "MATCH (c:Category)-[]->(p) " +
          "WHERE p.tmpSave = false AND u.userId = $userId AND p.visible = pub " +
          "RETURN p")
  List<Post> findPubPosts(@Param(value = "userId") String userId);



  // 모든 포스트 중에서 해당 카테고리의 해당 이름의 특정 포스트만 리턴
//  @Query("MATCH (p:Post) " +
//      "MATCH (u : Users) " +
//      "MATCH (c:Category)-[r]->(p) " +
//      "WHERE p.tmpSave = false AND u.userId = $userId AND c.name = $name " +
//      "RETURN p")

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
  Post findPostById(@Param(value = "id") String id);

  // 모든 임시 저장 post( All save Post pull )
  @Query("MATCH (c:Category)-[:IS_CHILD]->(p:Post) " +
          "WHERE p.state = false AND ID(p) = $id " +
          "RETURN p")
  List<Post> findSavePost(@Param(value = "id") String id);
}

