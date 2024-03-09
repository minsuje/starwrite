package starwrite.server.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Category;
import starwrite.server.entity.Posts;

@Repository
public interface PostsRepository extends Neo4jRepository<Posts, String> {
//  @Query("MATCH (n:posts{elementId: $categoryId})<-[r:POSTED]-(post:category) RETURN post")
//  List<Posts> findPostsById(String categoryId);

//    @Query("match (n:Category{id:$id})" + "match (p:Posts{id:1})" +
//        "MERGE (n)-[:POSTED]->(p)")
//    Posts relation(@Param("id") Long id,@Param("postId") Long postId);


}

