//package starwrite.server.repository;
//
//import org.springframework.data.neo4j.repository.Neo4jRepository;
//import org.springframework.data.neo4j.repository.query.Query;
//import org.springframework.data.repository.query.Param;
//import starwrite.server.dto.User;
//
//public interface UserRepository extends Neo4jRepository<User,Long> {
//    @Query("match (n:User) where n.handle =~ $handle return n")
//    User getUserByHandle(@Param("handle") String handle);
//}