package starwrite.server.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;

@Repository
public interface CategoryRepository extends Neo4jRepository<Category, Long> {
  @Query("MATCH (n:posts{category: $categoryId})<-[r:POSTED]-(post:category) RETURN post")
  List<Post> findPostsByCategory(Long categoryId);

  @Query("MATCH (c:Category) WHERE ID(c) = $id RETURN c LIMIT 1")
  Category findCategoryById(@Param(value = "id") Long id);

  @Query("MATCH (c:Category)" +
      "RETURN c")
  List<Category> getAllCategory();

  @Query("CREATE (c:Category{ name: $name, createdAt: localdatetime(), updatedAt: localdateTime()}) " +
      "RETURN c")
  Category createCategory(@Param(value = "name") String name);

}
