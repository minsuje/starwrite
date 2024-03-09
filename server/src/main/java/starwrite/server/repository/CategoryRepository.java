package starwrite.server.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import starwrite.server.entity.Category;
import starwrite.server.entity.Posts;

public interface CategoryRepository extends Neo4jRepository<Category, String> {
  @Query("MATCH (n:posts{category: $categoryId})<-[r:POSTED]-(post:category) RETURN post")
  List<Posts> findPostsByCategory(String categoryId);

  @Query("MATCH p=(n:Category)-[:POSTED]->(post:Posts) WHERE n.categoryId = 1 RETURN post")
  List<Posts> findCategoryById(@Param("id") String id);

//  @Query("MATCH (n:Category) where n.postCnt = $id RETURN n")
//  List<Posts> findCategoryById(@Param("id") Long id);


//  @Query("MATCH (n:Category)<-[:POSTED]-(post:Posts) where n.postCnt = $id RETURN post")
//  List<Posts> findCategoryById(@Param("id") Long id);




}
