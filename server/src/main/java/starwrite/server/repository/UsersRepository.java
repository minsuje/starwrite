package starwrite.server.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.neo4j.repository.query.Query;
import starwrite.server.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
}

