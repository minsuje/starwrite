package starwrite.server.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import starwrite.server.auth.RefreshToken;
import starwrite.server.repository.RefreshTokenRepository;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void saveTokenInfo (String email, String refreshToken, String accessToken) {
        refreshTokenRepository.save(new RefreshToken(email, accessToken, refreshToken));
    }

    @Transactional
    public void removeRefreshToken(String accessToken) {
        RefreshToken token = refreshTokenRepository.findByAccessToken(accessToken)
            .orElseThrow(IllegalArgumentException::new);

        refreshTokenRepository.delete(token);
    }
}
