package starwrite.server.repository;

import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import starwrite.server.auth.RefreshToken;

@Transactional
@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    // accessToken 으로 RefreshToken 을 찾아옴
    Optional<RefreshToken> findByAccessToken(String accessToken);
//
//    Optional<RefreshToken> findByRefreshToken(String refreshToken);
//    boolean existsByKeyEmail(String email);
//    void deleteByKeyEmail(String email);
}
