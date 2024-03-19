package starwrite.server.auth;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import starwrite.server.dto.JwtDTO;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

        // OAuth2User 로 캐스팅하여 인증된 사용자 정보를 가져옴
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // 사용자 이메일을 가져옴
        String mail = oAuth2User.getAttribute("email");

        // 서비스 제공 플랫폼이 어디인지 가져옴
        String provider = oAuth2User.getAttribute("provider");

        // CustomOAuth2UserService 에서 셋팅한 로그인한 회원 존재 여부를 가져옴
        boolean isExist = oAuth2User.getAttribute("exist");

        // OAuth2User 로부터 Role 을 얻어옴
        String role = oAuth2User.getAuthorities().stream().findFirst().orElseThrow().getAuthority();

        // 회원이 존재할 경우
        if (isExist)  {
            // 회원이 존재하면 jwt 발행을 시작함
            JwtDTO token = jwtTokenProvider.generateToken(authentication);
            log.info("jwtToken = {}", token.getAccessToken());

            // accessToken 을 쿼리스트링에 담는 url 을 만들어줌
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:8080/loginSuccess")
                .queryParam("accessToken", token.getAccessToken())
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString();
            log.info("redirect 준비");

            // 로그인 확인 페이지로 리다이렉트 시킴
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            // 회원이 존재하지 않을 경우, 서비스 제공자와 email 을 쿼리스트링으로 전달하는 url 을 만들어줌
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:8080/loginSuccess")
                .queryParam("email", (String)oAuth2User.getAttribute("email"))
                .queryParam("provider", provider)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString();

            // 회원가입 페이지로 리다이렉트 시킴
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }
}
