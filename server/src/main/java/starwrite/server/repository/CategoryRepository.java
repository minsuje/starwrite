package starwrite.server.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.relationship.Related;
import starwrite.server.response.CategoryDetailResponse;
import starwrite.server.response.CategoryPostResponse;
import starwrite.server.response.CategoryPosts;
import starwrite.server.response.GetCategoryPosts;
import starwrite.server.response.PostResponse;
import starwrite.server.response.RelatedPosts;
import starwrite.server.response.UserCategories;

//@Repository
public interface CategoryRepository extends Neo4jRepository<Category, String> {

  // 특정 유저에 해당하는 카테고리 찾아오기
  @Query("MATCH (c:Category)-[]-(u:Users) WHERE u.nickname = $nickname " +
      "OPTIONAL MATCH (c)-[r]->(p:Post) " +
      "RETURN c.categoryId AS categoryId, c.createdAt AS createdAt, c.name AS name, COUNT(p) AS postCount")
  List<UserCategories> getUserCategory(@Param(value = "nickname") String nickname);



  // 카테고리 수정
  @Query("MATCH (c:Category) WHERE c.categoryId = $categoryId " +
      "SET c.name = $name ")
  void updateCategory(@Param(value = "categoryId") String categoryId,
      @Param(value = "name") String name);




  // 카테고리 삭제
  @Query("MATCH (c:Category) WHERE c.categoryId = $categoryId " +
      "MATCH (c)-[r]-(u:Users) " +
      "DELETE r, c " +
      "RETURN count(c) as deletedCount")
  int deleteCategory(@Param(value = "categoryId") String categoryId);




  // 카테고리에 해당하는 모든 글 찾아오기
  // 스크랩 관계, 누가 썼는지에 대한 정보도 있어야함
  @Query("MATCH (c:Category) " +
      "WHERE c.categoryId = $categoryId " +
      "OPTIONAL MATCH (c)-[:IS_CHILD]->(p:Post) " +
      "WHERE p.tmpSave = false OR p IS NULL " +
      "OPTIONAL MATCH (p)-[:POSTED|HOLDS]->(u:Users) " +
      "OPTIONAL MATCH (p)-[:AUTHOR]->(author:Users) " +
      "WITH c, p, author " +
      "ORDER BY p.createdAt DESC " +
      "RETURN c.name AS categoryName, collect({postId: ID(p), title: p.title, content: substring(p.content, 0, 100), " +
      "recentView: p.recentView, createdAt: p.createdAt, updatedAt: p.updatedAt, " +
      "userId: author.userId, nickname: author.nickname}) AS categoryPosts")
  CategoryPostResponse getCategoryPosts(@Param(value = "categoryId") String categoryId);




  // 카테고리 모든 글 가져오기. 무한 스크롤 추가
//  @Query("MATCH (c:Category)-[:IS_CHILD]->(p:Post) " +
//      "WHERE c.categoryId = $categoryId AND p.tmpSave = false " +
//      "MATCH (p)-[:POSTED|HOLDS]->(u:Users) " +
//      "RETURN p.postId AS categoryPostId, p.title AS title, " +
//      "substring(p.content, 0, 50) AS content, " +
//      "p.recentView AS recentView, p.createdAt AS createdAt, p.updatedAt AS updatedAt, u.userId AS userId " +
//      "ORDER BY p.createdAt DESC " + // 여기서 정렬 조건을 추가할 수 있습니다.
//      "SKIP $skip LIMIT $limit")
//  List<CategoryPosts> getCategoryPosts(@Param(value = "categoryId") String categoryId,
//      @Param(value = "skip") int skip,
//      @Param(value = "limit") int limit);





  // 카테고리 안의 모든 글 제목과 관계 보내기
  @Query("MATCH (c:Category)-[]-(p:Post) " +
      "WHERE c.categoryId = $categoryId " +
      "WITH COLLECT({title: p.title, postId: ID(p), recentView: p.recentView }) AS posts " +
      "MATCH (p1:Post)-[r:RELATED]-(p2:Post) " +
      "WHERE ID(p1) IN [post IN posts | post.postId] AND ID(p2) IN [post IN posts | post.postId] " +
      "RETURN posts, COLLECT(DISTINCT {postId: r.postId, relatedPostId: r.relatedPostId}) AS relation ")
  GetCategoryPosts getCategoryPostsNode(@Param(value = "categoryId") String categoryId);

  //  @Query("MATCH (n:posts{category: $categoryId})<-[r:POSTED]-(post:category) RETURN post")
//  List<Post> findPostsByCategory(String categoryId);

//  @Query("MATCH (c:Category) WHERE c.categoryId = $id RETURN c LIMIT 1")
//  List<Category> findCategoryById(@Param(value = "id") String id);

//  @Query("MATCH (u:Users) WHERE u.userId =s $userId " +
//      "MATCH (c:Category) WHERE c.categoryId = $categoryId " +
//      "CREATE (u)-[r:OWNS]->(c) " +
//      "RETURN c")
//  RelatedPosts getCategoryPostsNode(@Param(value = "userId") String userId, @Param(value = "categoryId") String categoryId);

//  @Query("MATCH (c:Category)" +
//      "RETURN c")
//  List<Category> getAllCategory();

//  @Query(
//      "CREATE (c:Category{ name: $name, createdAt: localdatetime(), updatedAt: localdateTime()}) " +
//          "RETURN c")
//  Category createCategory(@Param(value = "name") String name);

//  @Query("MATCH p=(u:Users)-[r:OWNS]->() WHERE u.userId = $userId RETURN p LIMIT 1")
//  List<Object> findCategoryByUserId(@Param(value = "userId") String userId);

//  @Query("MATCH p=(u:Users)-[r]-(c:Category) RETURN collect(p)")
//  List<Object> findCategoryByUserId(@Param(value = "userId") String userId);

//  @Query("MATCH (u:Users)-[r]-(c:Category) WHERE u.userId = $userId RETURN u.userId AS userId, type(r) AS relationType, c.categoryId AS categoryId")
//  List<PostResponse> findCategoryByUserId(@Param("userId") String userId);

  // 이것이 작동되는걸 확인한 코드
//@Query("MATCH (u:Users)-[r]-(c:Category) WHERE u.userId = $userId RETURN u AS userId, type(r) AS relationType, c AS category LIMIT 1")
//PostResponse findCategoryByUserId(@Param(value = "userId") String userId);

//  @Query("MATCH (u:Users)-[r]-(c:Category)-[]-(p:Post) WHERE u.userId = $userId " +
//      "RETURN u AS userId, type(r) AS relationType, collect(c) AS category, collect(p) AS post")
//  PostResponse findCategoryByUserId(@Param(value = "userId") String userId);

//  @Query("MATCH (u:Users)-[]-(c:Category) " +
//      "MATCH (c)-[r]-(p:Post) " +
//      "RETURN r ")
//  List<GetCategoryPosts> getCategoryPosts(@Param(value = "categoryId") String categoryId,
//      @Param(value = "userId") String userId);

}
