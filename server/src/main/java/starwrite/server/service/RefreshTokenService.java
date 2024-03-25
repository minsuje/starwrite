package starwrite.server.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.auth.RefreshToken;
import starwrite.server.repository.RefreshTokenRepository;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    //    @Autowired
    private static RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public static void saveTokenInfo(String mail, String refreshToken, String accessToken) {
//        System.out.println("mail, refreshToken, accessToken" + mail + refreshToken + accessToken);
        refreshTokenRepository.save(new RefreshToken(mail, accessToken, refreshToken));
    }

    @Transactional
    public void removeRefreshToken(String accessToken) {
        RefreshToken token = refreshTokenRepository.findByAccessToken(accessToken)
            .orElseThrow(IllegalArgumentException::new);

        refreshTokenRepository.delete(token);
    }
}
