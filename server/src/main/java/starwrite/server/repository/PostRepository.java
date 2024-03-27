package starwrite.server.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Post;
import starwrite.server.response.BackLink;
import starwrite.server.response.CreatedPost;
import starwrite.server.response.GetPosts;
import starwrite.server.response.GetSavePost;
import starwrite.server.response.GetScrapPosts;
import starwrite.server.response.PostDetail;
import starwrite.server.response.SearchPosts;

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
  @Query("MATCH (p:Post{tmpSave:false}) " +
      "MATCH (u:Users) WHERE u.userId = $userId " +
      "MATCH (u:Users)-[r:POSTED|HOLDS]->(p:Post) " +
      "WHERE p.tmpSave = false AND u.userId = $userId " +
      "RETURN ID(p) AS postid, p.title AS title")
  List<BackLink> backLink(@Param(value = "userId") String userId);

  // 해당 카테고리의 모든 포스트 조회
/*
@Query("MATCH (p:Post) " +
      "MATCH (u : Users) " +
      "MATCH (c:Category)-[r]->(p) " +
      "WHERE p.tmpSave = false AND u.nickname = $nickname AND c.categoryId = $categoryId " +
      "RETURN collect(p) AS post, type(r) as categoryRelationType")
  GetPosts findAllPostsByCategory(@Param(value = "nickname") String nickname,
      @Param(value = "categoryId") String categoryId);
      */

  // 특정 유저의 모든 글 조회
//  @Query("MATCH (p:Post) " +
//      "MATCH (u: Users) " +
//      "MATCH (u)-[r]->(p) " +
//      "WHERE p.tmpSave = false AND u.nickname = $nickname " +
//      "RETURN collect(p) AS post , type(r) AS usersRelationType")
//  GetPosts findAllPostsByUserNickname(@Param(value = "nickname") String nickname);


  // 특정 유저의 모든 글 조회. 10개씩 무한스크롤 조회
  @Query("MATCH (u:Users)-[r:POSTED|HOLDS]->(p:Post) "
      + "WHERE u.nickname = $nickname AND p.tmpSave = false "
      + "MATCH (p)-[:IS_CHILD]-(c:Category) "
      + "WITH p, c, u "
      + "OPTIONAL MATCH (p)-[ar:AUTHOR]-(author:Users) "
      + "RETURN ID(p) AS postIdentifier, p.title AS postTitle, substring(p.parsedContent, 0, 100) AS content,  "
      + "p.visible AS visible, p.img AS img, p.recentView AS recentView, "
      + "p.createdAt AS createdAt, p.updatedAt AS updatedAt, "
      + "c.categoryId AS categoryId, c.name AS categoryName, "
      + "u.userId AS userId, u.nickname AS userNickname, author.userId AS originAuthorId, author.nickname AS originAuthor, EXISTS((p)<-[:AUTHOR]-()) AS scrap " + "ORDER BY p.updatedAt DESC "
      + "SKIP $skip LIMIT 100 ")
  List<GetPosts> findAllPostsByUserNickname(@Param(value = "nickname") String nickname,
      @Param(value = "skip") int skip, @Param(value = "limit") int limit);


  // 특정 유저의 스크랩한 글 조회. 10개씩 무한스크롤 조회
  @Query(
      "MATCH (u:Users)-[r:HOLDS]->(p:Post) " + "WHERE u.nickname = $nickname AND p.tmpSave = false "
          + "MATCH (p)-[:IS_CHILD]-(c:Category) "
          + "WITH p, c, u "
          + "OPTIONAL MATCH (p)-[ar:AUTHOR]-(author:Users) "
          + "RETURN ID(p) AS postIdentifier, p.title AS postTitle, substring(p.parsedContent, 0, 100) AS content,  "
          + "p.visible AS visible, p.img AS img, p.recentView AS recentView, "
          + "p.createdAt AS createdAt, p.updatedAt AS updatedAt, "
          + "c.categoryId AS categoryId, c.name AS categoryName, "
          + "u.userId AS userId, u.nickname AS userNickname, author.userId AS originAuthorId, author.nickname AS originAuthor " + "ORDER BY p.updatedAt DESC "
          + "SKIP $skip LIMIT 100 ")
  List<GetScrapPosts> findScrapPosts(@Param(value = "nickname") String nickname,
      @Param(value = "skip") int skip, @Param(value = "limit") int limit);


  // 임시 저장 글 모두 불러오기
  @Query("MATCH (p:Post) " + "MATCH (u: Users) " + "MATCH (c: Category) " + "MATCH (u)-[r]->(p) "
      + "MATCH (c)-[i:IS_CHILD]->(p) " + "WHERE p.tmpSave = true AND u.nickname = $nickname "
      + "RETURN collect(p) AS posts, type(r) AS usersRelationType, ID(p) AS postid, c.categoryId AS categoryid")
  List<GetSavePost> findAllSavePosts(@Param(value = "nickname") String nickname);

  // 비공개 글을 제외하고 표시 (without pub post)
  @Query("MATCH (p:Post) " + "MATCH (u : Users) " + "MATCH (c:Category)-[r]->(p) "
      + "WHERE p.tmpSave = false AND u.userId = $userId AND p.visible = pub "
      + "RETURN collect(p) AS post, type(r) as relationType")
  GetPosts findPubPosts(@Param(value = "userId") String userId);

  // 임시저장글 삭제 (delete save post)
  @Query("MATCH (u:Users) " + "MATCH (p: Post) "
      + "WHERE p.title = $title AND p.tmpSave = true AND u.userId = $userId " + "DELETE p ")
  void DeleteSavePost(@Param(value = "content") String content,
      @Param(value = "title") String title, @Param(value = "userId") String userId);

  @Query("MATCH (u:Users{nickname = $nickname}) " + "MATCH (p:Post{ID(p) = $postId}) "
      + "SET p.tmpSave = true ")
  void tmpSaveChange(@Param(value = "postId") Long postId,
      @Param(value = "nickname") String nickname);


  // 포스트 상세 페이지 + 최근 본 시점 기록 (내 글)
  @Query("MATCH (p:Post) WHERE ID(p) = $postId " + "SET p.recentView = $recentView " + "RETURN p")
  Post setRecentView(@Param(value = "postId") Long postId,
      @Param(value = "recentView") LocalDateTime recentView);


  // 포스트 상세 보기 (상대방 글)
  @Query("MATCH (p:Post) WHERE ID(p) = $postId " + "RETURN p")
  Post otherUserPost(@Param("postId") Long postId);


  // 포스트에 유저 아이디 추출하기
  @Query("MATCH (p:Post) WHERE ID(p) = $postId " + "MATCH (p)-[r]-(u:Users) " + "RETURN u.userId")
  String findUserIdByPostId(@Param("postId") Long postId);


  // 글 상세
  @Query("MATCH (p:Post) WHERE ID(p) = $postId " +
      "MATCH (u:Users) WHERE u.userId = $userId " +
      "OPTIONAL MATCH (p)<-[:IS_CHILD]-(c:Category) " +
      "WITH p, u, c " +
      "OPTIONAL MATCH (p)-[:POSTED]-(author:Users) " +
      "WITH p, author, c, CASE WHEN author.userId = $userId THEN true ELSE false END as isAuthor " +
      "OPTIONAL MATCH (p)<-[:COMMENT]-(a:Annotation) " +
      "OPTIONAL MATCH (a)-[:COMMENTED]-(annotationAuthor:Users) " +
      "WHERE (p)-[:POSTED]-(author) AND a.type = 'comment' " +
      "OR NOT (p)-[:POSTED]-(author) AND (a.type = 'comment' OR (p)-[:COMMENT]-(author)) " +
      "WITH p, author, c, a, annotationAuthor, isAuthor " +
      "ORDER BY a.createdAt DESC " +
      "WITH collect({annotationId: ID(a), position: a.position, type: a.type, content: a.content, createdAt: a.createdAt, updatedAt: a.updatedAt, userId: annotationAuthor.userId, nickName: annotationAuthor.nickname, parentAnnotation: a.parentAnnotation}) as annotations, p, author, c, isAuthor " +
      "SET p.recentView = CASE WHEN isAuthor THEN localDateTime() ELSE p.recentView END " +
      "RETURN ID(p) as postIdentifier, p.title AS title, p.content AS content, p.visible AS visible, p.img AS img, p.tmpSave AS tmpSave, p.recentView AS recentView, p.createdAt AS createdAt, p.updatedAt AS updatedAt, author.userId AS authorUserId, author.nickname AS authorNickname, c.categoryId AS categoryId, c.name AS categoryName, annotations")
  PostDetail getPostDetail(@Param(value = "postId") Long postId, @Param(value = "userId") String userId);



  // 임시 저장글 하나 불러오기
  @Query("MATCH (p:Post) " + "MATCH (u:Users) " + "MATCH (c:Category) " +
      // 임시 저장 삭제
//      "WHERE ID(p) = $postId AND p.tmpSave = true AND u.nickname = $nickname " +
      "WHERE ID(p) = $postId AND u.nickname = $nickname " + "WITH p, u , c "
      + "MATCH (c)-[:IS_CHILD]-(p) " + "RETURN collect(p) AS posts, c.categoryId AS categoryid ")
  GetSavePost findSavePost(@Param(value = "nickname") String nickname,
      @Param(value = "postId") Long postId);

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


  @Query(
      "MERGE (newPost:Post {title: $title, content: $content, parsedContent: $parsedContent, visible: $visible, img: $img, tmpSave: false, createdAt: $timeNow, updatedAt: $timeNow, recentView: $timeNow }) "
          + "WITH newPost "
          + "UNWIND CASE WHEN size($relatedPosts) = 0 THEN [null] ELSE $relatedPosts END AS relatedPostId "
          + "    OPTIONAL MATCH (p2:Post) WHERE ID(p2) = relatedPostId "
          + "    OPTIONAL MATCH (relatedPost:Post) WHERE ID(relatedPost) = relatedPostId "
          + "    FOREACH (p IN CASE WHEN relatedPost IS NOT NULL THEN [relatedPost] ELSE [] END | "
          + "        MERGE (newPost)-[r:RELATED]->(p) "
          + "        ON CREATE SET r.relatedBack = $relatedBack, r.postId = ID(newPost), r.postTitle = $title, r.relatedPostId = ID(p), r.relatedPostTitle = p2.title) "
          + "WITH newPost " + "MATCH (category:Category) WHERE category.categoryId = $categoryId "
          + "MERGE (newPost)<-[:IS_CHILD]-(category) " + "WITH newPost "
          + "MATCH (user:Users) WHERE user.userId = $userId " + "MERGE (user)-[:POSTED]->(newPost) "
          + "RETURN newPost AS post, ID(newPost) AS identifier LIMIT 1")
  CreatedPost createPostLink(@Param("userId") String userId, @Param("categoryId") String categoryId,
      @Param("title") String title, @Param("content") String content,
      @Param("parsedContent") String parsedContent, @Param("visible") String visible,
      @Param("img") String img, @Param("timeNow") LocalDateTime timeNow,
      @Param("relatedBack") boolean relatedBack, @Param("relatedPosts") List<Long> relatedPosts);
  // 기존에는 Array가 String 타입으로 들어가서 에러가 났었다
  // Cypher 에는 List<Long> 타입으로 변환해서 넣어주자


  // 글 생성 페이지에서 임시저장
  @Query(
      "MERGE (savePost:Post {title: $title, content: $content, visible: $visible, img: $img, tmpSave: true, createdAt: $timeNow, updatedAt: $timeNow}) "
          + "WITH savePost " +
//          "UNWIND CASE WHEN size($relatedPosts) = 0 THEN [null] ELSE $relatedPosts END AS relatedPostId "
//          +
//          "    OPTIONAL MATCH (relatedPost:Post) WHERE ID(relatedPost) = relatedPostId " +
//          "    FOREACH (p IN CASE WHEN relatedPost IS NOT NULL THEN [relatedPost] ELSE [] END | " +
//          "        MERGE (savePost)-[r:RELATED]->(p) " +
//          "        ON CREATE SET r.relatedBack = $relatedBack, r.postId = ID(savePost), r.relatedPostId = ID(p)) "
//          +
//          "WITH savePost " +
          "MATCH (category:Category) WHERE category.categoryId = $categoryId "
          + "MERGE (savePost)<-[:IS_CHILD]-(category) " + "WITH savePost "
          + "MATCH (user:Users) WHERE user.userId = $userId "
          + "MERGE (user)-[:POSTED]->(savePost) "
          + "RETURN savePost AS post, ID(savePost) AS identifier LIMIT 1")
  CreatedPost savePostLink(@Param(value = "userId") String userId,
      @Param(value = "categoryId") String categoryId, @Param(value = "title") String title,
      @Param(value = "content") String content, @Param(value = "visible") String visible,
      @Param(value = "img") String img, @Param(value = "timeNow") LocalDateTime timeNow,
      @Param(value = "relatedBack") boolean relatedBack,
      @Param(value = "relatedPosts") List<Long> relatedPosts);

  // 임시저장 페이지에서 저장
  @Query("MATCH (u:Users) " + "MATCH (p:Post) " + "WHERE ID(p) = $postId AND u.userId = $userId "
      + "SET p.title = $newTitle, p.content = $newContent, p.img = $img, p.updatedAt = $timeNow, p.visible = $visible "
      + "RETURN p")
  Post saveAgain(@Param("postId") Long postId, @Param("userId") String userId,
      @Param("newTitle") String newTitle, @Param("img") String img,
      @Param("timeNow") LocalDateTime timeNow, @Param("newContent") String newContent,
      @Param("visible") String visible);


  //   임시저장 페이지에서 포스팅
  @Query("MATCH (u:Users) WHERE u.userId = $userId " + "MATCH (p:Post) WHERE ID(p) = $postId "
      + "DETACH DELETE p ")
  void deletePostByPostId(@Param("postId") Long postId, @Param("userId") String userId);


  // 글 수정 - 관련 글이 있는 경우
  @Query("MATCH (post:Post) " + "WHERE ID(post) = $postId "
      + "SET post.title = $newTitle, post.content = $newContent, post.img = $img, post.updatedAt = localDateTime(), post.visible = $visible, post.tmpSave = false "
      + "WITH post "
      + "UNWIND (CASE WHEN SIZE($rel) > 0 THEN $rel ELSE [null] END) AS relatedPostId "
      + "   OPTIONAL MATCH (relatedPost:Post) WHERE relatedPost IS NOT NULL AND ID(relatedPost) = relatedPostId "
      + "   OPTIONAL MATCH (post)<-[r:RELATED]-(relatedPost) "
      + "   FOREACH (ignoreMe IN CASE WHEN r IS NOT NULL THEN [1] ELSE [] END | "
      + "       SET r.relatedBack = true) "
      + "   FOREACH (ignoreMe IN CASE WHEN r IS NULL THEN [1] ELSE [] END | "
      + "       MERGE (post)-[newR:RELATED]->(relatedPost) "
      + "       ON CREATE SET newR.postId = ID(post), newR.postTitle = post.title, newR.relatedPostId = ID(relatedPost), newR.relatedPostTitle = relatedPost.title, newR.relatedBack = false) "
      + "WITH post " + "OPTIONAL MATCH (post)<-[oldCatRel:IS_CHILD]-(oldCategory:Category) "
      + "DELETE oldCatRel " + "WITH post "
      + "MATCH (category:Category) WHERE category.categoryId = $categoryIdentifier "
      + "MERGE (category)-[newRel:IS_CHILD]->(post) " + "RETURN count(newRel)")
  int updatePost(@Param(value = "postId") Long postId, @Param(value = "newTitle") String newTitle,
      @Param(value = "img") String img, @Param(value = "newContent") String newContent,
      @Param(value = "rel") List<Long> rel, @Param(value = "visible") String visible,
      @Param(value = "categoryIdentifier") String categoryId);


  // 글 수정 - 관련 글이 없는 경우
  @Query("MATCH (post:Post) " + "WHERE ID(post) = $postId "
      + "SET post.title = $newTitle, post.content = $newContent, post.img = $img, post.updatedAt = localDateTime(), post.visible = $visible, post.tmpSave = false "
      + "WITH post " + "OPTIONAL MATCH (post)-[oldRel:RELATED]->(relatedPost:Post) "
      + "DELETE oldRel " + "WITH post "
      + "OPTIONAL MATCH (post)<-[oldRelBack:RELATED]-(relatedPost:Post) "
      + "SET oldRelBack.relatedBack = CASE WHEN oldRelBack.relatedBack = true THEN false ELSE null END "
      + "WITH post " + "OPTIONAL MATCH (post)<-[oldCatRel:IS_CHILD]-(oldCategory:Category) "
      + "DELETE oldCatRel " + "WITH post "
      + "MATCH (category:Category) WHERE category.categoryId = $categoryIdentifier "
      + "MERGE (category)-[newRel:IS_CHILD]->(post) " + "RETURN count(newRel)")
  int updatePostNull(@Param(value = "postId") Long postId,
      @Param(value = "newTitle") String newTitle, @Param(value = "img") String img,
      @Param(value = "newContent") String newContent, @Param(value = "visible") String visible,
      @Param(value = "categoryIdentifier") String categoryId);


  // 글 스크랩
//  @Query("MATCH (p:Post {ID(p) = $postId}), (u:Users {userId: $userId}) " +
//      "CREATE (copiedPost:Post {title: p.title, content: p.content, visible: p.visible, img: p.img, tmpSave: p.tmpSave, recentView: p.recentView, createdAt: datetime(), updatedAt: datetime()}) " +
//      "CREATE (p)-[:COPY]->(copiedPost) " +
//      "CREATE (u)-[:HOLDS]->(copiedPost) " +
//      "RETURN count(copiedPost)")
//  int scrapPost(Long postId, String userId);
//  @Query("MATCH (u:Users {userId: $userId}), (p:Post) " +
//      "WHERE ID(p) = $postId AND NOT (u)-[:POSTED]->(p) AND NOT (u)-[:HOLDS]->(:Post)-[:COPY]->(p) " +
//      "MATCH (c:Category {categoryId: $categoryId}) " +
//      "MATCH (author:Users)-[:POSTED]-(p) " +
//      "CREATE (copiedPost:Post {title: p.title, content: p.content, visible: p.visible, img: p.img, " +
//      "tmpSave: p.tmpSave, recentView: localDateTime(), createdAt: localDateTime(), updatedAt: localDateTime()}) " +
//      "CREATE (p)-[:COPY]->(copiedPost) " +
//      "CREATE (u)-[:HOLDS]->(copiedPost) " +
//      "CREATE (c)-[r:IS_CHILD]->(copiedPost) " +
//      "CREATE (author)-[:AUTHOR]->(copiedPost) " +
//      "RETURN count(r) ")
//  int scrapPost(@Param(value = "postId") Long postId, @Param(value = "userId") String userId, @Param(value = "categoryId") String categoryId);
  @Query("MATCH (u:Users {userId: $userId}), (p:Post) " + "WHERE ID(p) = $postId "
      + "AND NOT (u)-[:POSTED]->(p) " + "WITH u, p, " + "   CASE "
      + "   WHEN (u)-[:HOLDS]->(:Post)-[:COPY]->(p) THEN 'Already Scrapped' "
      + "   WHEN (u)-[:AUTHOR]->(p) THEN 'Author' " + "   ELSE 'Proceed' "
      + "   END as ScrappingStatus " + "WHERE ScrappingStatus = 'Proceed' "
      + "MATCH (c:Category {categoryId: $categoryId}) " + "MATCH (author:Users)-[:POSTED]->(p) "
      + "CREATE (copiedPost:Post {title: p.title, content: p.content, parsedContent: p.parsedContent, visible: p.visible, img: p.img, "
      + "tmpSave: p.tmpSave, recentView: localDateTime(), createdAt: localDateTime(), updatedAt: localDateTime()}) "
      + "CREATE (p)-[:COPY]->(copiedPost) " + "CREATE (u)-[:HOLDS]->(copiedPost) "
      + "CREATE (c)-[r:IS_CHILD]->(copiedPost) " + "CREATE (author)-[:AUTHOR]->(copiedPost) "
      + "RETURN count(r) ")
  int scrapPost(@Param(value = "postId") Long postId, @Param(value = "userId") String userId,
      @Param(value = "categoryId") String categoryId);


  // 글 검색
  @Query("MATCH (post:Post)<-[r:POSTED|AUTHOR]-(user:Users) "
      + "WHERE post.title =~ ('.*' + $title + '.*') " + "AND post.visible = 'true' "
      + "AND post.tmpSave = false "
      + "RETURN ID(post) AS searchPostId, post.title AS title, post.parsedContent AS content, user.userId AS userId, user.nickname AS nickName, post.createdAt AS createdAt")
  List<SearchPosts> searchPosts(@Param(value = "title") String title);





/*  @Query("MATCH (p:Post), (r:Post) WHERE p.postId = $postId AND r.postId = $relatedPostId " +
      "OPTIONAL MATCH (p)-[rel:RELATED]->(r) " +
      "WITH p, r, rel " +
      "WHERE rel IS NULL " +
      "CREATE (p)-[:RELATED {postId: $postId, relatedPostId: $relatedPostId, relatedBack: false}]->(r) "
      +
      "RETURN p")
  Post createAndLinkRelatedPost(@Param("postId") String postId,
      @Param("relatedPostId") String relatedPostId);*/


/*  @Query("MATCH (p:Post)-[r:RELATED]->(relatedPost) WHERE p.postId = $postId " +
      "RETURN p, collect(relatedPost) as relatedPosts")
  Post findPostWithRelatedPosts(@Param("postId") String postId);*/


/*  @Query("MATCH (p:Post)-[:RELATED]->(r:Post) WHERE p.postId = $postId RETURN r")
  List<Post> findRelatedPosts(@Param("postId") String postId);*/

  /*@Query("UNWIND $relatedPostIds AS relatedPostId " +
      "MATCH (p:Post) WHERE p.postId = $postId " +
      "MATCH (r:Post) WHERE r.postId = relatedPostId " +
      "MERGE (p)-[:RELATED]->(r)")
  void createMultipleRelationships(@Param("postId") String postId,
      @Param("relatedPostIds") List<String> relatedPostIds);*/

  // 글 스크랩

}

