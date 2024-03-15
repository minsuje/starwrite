package starwrite.server.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.neo4j.cypherdsl.core.Match;
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

  // 임시 저장 글 모두 불러오기
  @Query("MATCH (p:Post) " +
      "MATCH (u: Users) " +
      "MATCH (u)-[r]->(p) " +
      "WHERE p.tmpSave = true AND u.nickname = $nickname " +
      "RETURN collect(p) AS post, type(r) AS usersRelationType"
  )
  GetPosts findAllSavePosts(@Param(value = "nickname") String nickname);

  // 비공개 글을 제외하고 표시 (without pub post)
  @Query("MATCH (p:Post) " +
      "MATCH (u : Users) " +
      "MATCH (c:Category)-[r]->(p) " +
      "WHERE p.tmpSave = false AND u.userId = $userId AND p.visible = pub " +
      "RETURN collect(p) AS post, type(r) as relationType")
  GetPosts findPubPosts(@Param(value = "userId") String userId);


  // 포스트 상세 페이지 + 최근 본 시점 기록
  @Query("MATCH (p:Post{postId : $postId}) " +
      "SET p.recentView = $recentView " +
      "RETURN p"
  )
  Post setRecentView(@Param(value = "postId") String postId, @Param(value = "recentView") LocalDateTime recentView);

  // 임시 저장글 하나 불러오기
  @Query("MATCH (p:Post) " +
      "MATCH (u:Users) " +
      "WHERE p.postId = $postId AND p.tmpSave = true AND u.nickname = $nickname " +
      "RETURN p")
  Post findSavePost(@Param(value = "nickname") String nickname, @Param(value = "postId") String postId);

  // 포스트 아이디로 하나의 포스트 찾기
  @Query("MATCH (p:Post) " +
      "WHERE p.postId = $postId " +
      "RETURN p"
  )
  Post findPostByPostId(@Param(value = "postId") String postId);

  @Query("MATCH (p:Post) WHERE ID(p) = $id RETURN p")
  Post findPostById(@Param(value = "id") String id);

}

