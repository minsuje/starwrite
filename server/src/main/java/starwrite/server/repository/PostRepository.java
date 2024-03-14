package starwrite.server.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.stringtemplate.v4.ST;
import starwrite.server.entity.Post;
import starwrite.server.response.GetPosts;

@Repository
public interface PostRepository extends Neo4jRepository<Post, String> {

//  // 글 생성
//  @Query("MATCH (u:Users {userId: $userId}), (c:Category {categoryId: $categoryId})" +
//      "CREATE (p:Post {title: $title, content: $content, visible: $visible, tmpSave: $tmpSave, createdAt: localDateTime(), updatedAt: localDateTime()}) " +
//      "CREATE (u)-[:POSTED]->(p) " +
//      "CREATE (p)-[:IS_CHILD]->(c) " +
//      "RETURN p")
//  Post createPost(@Param(value = "title") String title, @Param(value = "content") String content,
//      @Param(value = "visible") String visible, @Param(value = "tmpSave") boolean tmpSave,
//      @Param(value = "userId") String userId, @Param(value = "categoryId") String categoryId);

//  // 해당 유저의 공개 비공개글 모두 표시 (All post)
//  @Query("MATCH (p:Post) " +
//      "MATCH (u : Users) " +
//      "MATCH (c:Category)-[r]->(p) " +
//      "WHERE p.tmpSave = false AND u.userId = $userId " +
//      "RETURN collect(p) AS post, type(r) as relationType")
//  GetPosts findAllPosts(@Param(value = "userId") String userId);

  // 해당 카테고리의 모든 포스트 조회
  @Query("MATCH (p:Post) " +
      "MATCH (u : Users) " +
      "MATCH (c:Category)-[r]->(p) " +
      "WHERE p.tmpSave = false AND u.nickname = $nickname AND c.categoryId = $categoryId " +
      "RETURN collect(p) AS post, type(r) as categoryRelationType")
  GetPosts findAllPostsByCategory(@Param(value = "nickname") String nickname,
      @Param(value = "categoryId") String categoryId);

  // 특정 유저의 모든 글 조회
  @Query("MATCH (p:Post) " +
      "MATCH (u: Users) " +
      "MATCH (u)-[r]->(p) " +
      "WHERE p.tmpSave = false AND u.nickname = $nickname " +
      "RETURN collect(p) AS post , type(r) AS usersRelationType")
  GetPosts findAllPostsByUserNickname(@Param(value = "nickname") String nickname);

//  // ( 로그인한 유저의 ) 모든 글 조회
//  @Query("MATCH (p:Post) " +
//      "MATCH (u: Users) " +
//      "MATCH (u)-[r]->(p) " +
//      "WHERE p.tmpSave = false AND u.nickname = $nickname " +
//      "RETURN collect(p) AS post , type(r) AS usersRelationType")
//  GetPosts findAllPostsByUserNicknameMine(@Param(value = "nickname") String nickname);

  // 비공개 글을 제외하고 표시 (without pub post)
  @Query("MATCH (p:Post) " +
      "MATCH (u : Users) " +
      "MATCH (c:Category)-[r]->(p) " +
      "WHERE p.tmpSave = false AND u.userId = $userId AND p.visible = pub " +
      "RETURN collect(p) AS Post, type(r) as relationType")
  GetPosts findPubPosts(@Param(value = "userId") String userId);

  // 하나의 글 불러오기
  /*@Query("MATCH (p:Post) " +
      "MATCH (u: Users) " +
      "MATCH (c:Category) " +
      "MATCH (c)-[r]->(p) " +
      "WHERE p.tmpSave = false AND p.postId = $postId " +
      "SET p.recentView = $recentView " +
      "RETURN collect(p)"
  )
  GetPosts findOnePost(@Param(value = "postId") String postId, @Param(value = "recentView")
      LocalDateTime recentView);*/

  @Query("MERGE (p:Post) " +
      "WHERE p.tmpSave = false AND p.postId = $postId " +
      "SET p.recentView = $recentView " +
      "RETURN collect(p) AS Post"
  )
  GetPosts findOnePost(@Param(value = "postId") String postId, @Param(value = "recentView") LocalDateTime recentView);

  @Query("MATCH (p:Post) " +
      "WHERE p.postId = $postId " +
      "SET p.recentView = $recentView " +
      "RETURN p.recentView"
  )
  LocalDateTime setRecentView(@Param(value = "postId") String postId, @Param(value = "recentView") LocalDateTime recentView);



  @Query("MATCH (p:Post) " +
      "WHERE p.postId = $postId " +
      "RETURN p"
  )
  Post findPostByPostId(@Param(value = "postId") String postId);
  // 내 모든 포스트 중에서 해당 카테고리의 해당 이름의 특정 포스트만 리턴
//  @Query("MATCH (p:Post) " +
//      "MATCH (u : Users) " +
//      "MATCH (c:Category)-[r]->(p) " +
//      "WHERE p.tmpSave = false AND u.userid = $userid AND c.name = $name " +
//      "RETURN p")
//  Post findDetailPost(@Param(value = "userid") String userid, @Param(value = "name") String name);

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

}

