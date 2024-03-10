package starwrite.server.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import starwrite.server.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> { // pk가 long 타입이므로 long 도 추가
    Optional<Users> findByEmail(String email);
}

