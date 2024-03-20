package starwrite.server.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import starwrite.server.auth.RefreshToken;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    // accessToken 으로 RefreshToken 을 찾아옴
    Optional<RefreshToken> findByAccessToken(String accessToken);
}
