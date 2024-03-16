package starwrite.server.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.neo4j.cypherdsl.core.Match;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Post;
import starwrite.server.response.CreatedPost;
import starwrite.server.response.BackLink;
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

  // 백링크 정보 보내기 (send back link info )
  @Query("MATCH (p: Post) " +
      "MATCH (u:Users) " +
      "WHERE u.userId = $userId AND p.tmpSave = false " +
      "RETURN p.postId AS postId, p.title AS title")
  List<BackLink> backLink(@Param(value = "userId") String userId);

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

  @Query("MATCH (p:Post) WHERE p.postId = $id RETURN p ")
  Post findPostById(@Param(value = "id") String id);


  //  @Query("MATCH (p:Post), (r:Post) WHERE p.postId = $postId AND r.postId = $relatedPostId " +
//      "CREATE (p)-[:RELATED {postId: $postId, relatedPostId: $relatedPostId, relatedBack: false}]->(r) " +
//      "RETURN p")
  @Query("MATCH (p:Post), (r:Post) WHERE p.postId = $postId AND r.postId = $relatedPostId " +
      "OPTIONAL MATCH (p)-[rel:RELATED]->(r) " +
      "WITH p, r, rel " +
      "WHERE rel IS NULL " +
      "CREATE (p)-[:RELATED {postId: $postId, relatedPostId: $relatedPostId, relatedBack: false}]->(r) "
      +
      "RETURN p")
  Post createAndLinkRelatedPost(@Param("postId") String postId,
      @Param("relatedPostId") String relatedPostId);


  @Query("MATCH (p:Post)-[r:RELATED]->(relatedPost) WHERE p.postId = $postId " +
      "RETURN p, collect(relatedPost) as relatedPosts")
  Post findPostWithRelatedPosts(@Param("postId") String postId);


  @Query("MATCH (p:Post)-[:RELATED]->(r:Post) WHERE p.postId = $postId RETURN r")
  List<Post> findRelatedPosts(@Param("postId") String postId);

  @Query("UNWIND $relatedPostIds AS relatedPostId " +
      "MATCH (p:Post) WHERE p.postId = $postId " +
      "MATCH (r:Post) WHERE r.postId = relatedPostId " +
      "MERGE (p)-[:RELATED]->(r)")
  void createMultipleRelationships(@Param("postId") String postId,
      @Param("relatedPostIds") List<String> relatedPostIds);

  /*@Query("UNWIND $relatedPosts AS relatedPostId " +
      "MATCH (relatedPost:Post) WHERE relatedPost.postId = relatedPostId " +
      "CREATE (newPost:Post {title: $title, content: $content, visible: $visible, img: $img, tmpSave: $tmpSave, recentView: $timeNow, createdAt: $timeNow, updatedAt: $timeNow}) "
      +
      "MERGE (newPost)-[r:RELATED {postId: newPost.postId, relatedPostId: relatedPost.postId, relatedBack: $relatedBack}]->(relatedPost) "
      +
      "RETURN newPost, collect(relatedPost) as relatedPosts")
  void createPostLink(@Param("title") String title,
      @Param("content") String content, @Param("visible") String visible,
      @Param("img") String img, @Param("tmpSave") boolean tmpSave,
      @Param("timeNow") LocalDateTime timeNow, @Param("relatedBack") boolean relatedBack,
      @Param("relatedPosts") List<String> relatedPosts);*/


  @Query("MERGE (newPost:Post {title: $title, content: $content, visible: $visible, img: $img, tmpSave: $tmpSave, createdAt: $timeNow, updatedAt: $timeNow}) " +
      "WITH newPost " +
      "UNWIND CASE WHEN size($relatedPosts) = 0 THEN [null] ELSE $relatedPosts END AS relatedPostId " +
      "    OPTIONAL MATCH (relatedPost:Post) WHERE ID(relatedPost) = relatedPostId " +
      "    FOREACH (p IN CASE WHEN relatedPost IS NOT NULL THEN [relatedPost] ELSE [] END | " +
      "        MERGE (newPost)-[r:RELATED]->(p) " +
      "        ON CREATE SET r.relatedBack = $relatedBack, r.postId = ID(newPost), r.relatedPostId = ID(p)) " +
      "WITH newPost " +
      "MATCH (category:Category) WHERE category.categoryId = $categoryId " +
      "MERGE (newPost)-[:IS_CHILD]->(category) " +
      "WITH newPost " +
      "MATCH (user:Users) WHERE user.userId = $userId " +
      "MERGE (user)-[:POSTED]->(newPost) " +
      "RETURN newPost AS post, ID(newPost) AS identifier LIMIT 1")
  CreatedPost createPostLink(@Param("userId") String userId, @Param("categoryId") String categoryId, @Param("title") String title,
      @Param("content") String content, @Param("visible") String visible,
      @Param("img") String img, @Param("tmpSave") boolean tmpSave,
      @Param("timeNow") LocalDateTime timeNow, @Param("relatedBack") boolean relatedBack,
      @Param("relatedPosts") List<Long> relatedPosts);
  // 기존에는 Array가 String 타입으로 들어가서 에러가 났었다
  // Cypher 에는 List<Long> 타입으로 변환해서 넣어주자
}

