package starwrite.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import starwrite.server.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
}

