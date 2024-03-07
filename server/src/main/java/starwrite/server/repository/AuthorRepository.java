package starwrite.server.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;
import starwrite.server.entity.Author;

@Repository
public interface AuthorRepository extends Neo4jRepository<Author, Long> {

}