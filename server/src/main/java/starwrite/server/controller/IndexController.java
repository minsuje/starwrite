package starwrite.server.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.auth.JwtTokenProvider;
import starwrite.server.auth.RefreshToken;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.auth.TokenResponseStatus;
import starwrite.server.dto.JwtDTO;
import starwrite.server.dto.LogInDTO;
import starwrite.server.dto.StatusResponseDTO;
import starwrite.server.repository.RefreshTokenRepository;
import starwrite.server.service.RefreshTokenService;
import starwrite.server.service.UsersService;
import starwrite.server.service.UsersServiceImpl;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IndexController {

    private final Logger Logger = LoggerFactory.getLogger(IndexController.class.getName());

//    private final RefreshTokenRepository refreshTokenRepository;

//    private final RefreshTokenService refreshTokenService;

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    UsersService usersService;

    @Autowired
    private HttpServletResponse response;

    @Autowired
    UsersServiceImpl usersServiceimpl;

    private final RefreshTokenService refreshTokenService;

    private final RefreshTokenRepository refreshTokenRepository;

    @GetMapping("/login")
    public void login() {
        System.out.println("logIn ");
    }


    // 유저 홈
    @GetMapping("/user/home")
    public String handleUserHome() {
        System.out.println("controller nickname >>> " + SecurityUtil.getCurrentUserNickname());
        System.out.println("controller userId >>> " + SecurityUtil.getCurrentUserUserId());
        System.out.println("controller auth >>> " + SecurityUtil.getCurrentUserAuth());

//        Cookie cookie = new Cookie("nickName", SecurityUtil.getCurrentUserNickname());
//        cookie.setMaxAge(60 * 60 * 24 * 7);  // 쿠키 유효 시간 : 1주일
//        response.addCookie(cookie);
//
//        System.out.println("cookie >>>>>>> " + cookie);
        return "home_user";
    }

    // 관리자 페이지
//  @GetMapping("/admin/home")
//  public String handleAdminHome() {
//    return "home_admin";
//  }

    @PostMapping("/login/post")
    public JwtDTO signIn(@RequestBody LogInDTO logInDTO) {
        System.out.println("signin" + logInDTO);
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");

        String username = logInDTO.getMail();
        String password = logInDTO.getPassword();
        JwtDTO jwtDTO = usersServiceimpl.signIn(username, password);
        System.out.println("jwtDTO >>>>>>>>>" + jwtDTO);
        log.info("request username = {}, password = {}", username, password);
        log.info("jwtDTO accessToken = {}, refreshToken = {}", jwtDTO.getAccessToken(),
            jwtDTO.getRefreshToken());

        return jwtDTO;
    }

    @GetMapping("/cookie")
    public Cookie setCookie(Authentication authentication) {
        System.out.println("/cookie authentication > " + authentication);
        Cookie cookie = new Cookie("nickName", SecurityUtil.getCurrentUserNickname());
      System.out.println("cookie name >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + cookie.getValue()  + " ----- " +   SecurityUtil.getCurrentUserNickname());
        cookie.setMaxAge(60 * 60 * 24 * 7);  // 쿠키 유효 시간 : 1주일
        response.addCookie(cookie);

        return cookie;
    }

    // 로그아웃
    @PostMapping("user/logout")
    public ResponseEntity<StatusResponseDTO> logout(
        @RequestHeader("Authorization") final String accessToken, HttpServletRequest httpServletRequest) {
        System.out.println("logout accessToken >>>>>>>>>>  " + accessToken);

      Cookie[] cookies = httpServletRequest.getCookies();
      if (cookies != null && cookies.length > 0) {
        for (Cookie cookie : cookies) {
          if (cookie.getName().equals("nickName")) {
            cookie.setValue("");
            cookie.setPath("/");
            cookie.setMaxAge(0);
            response.addCookie(cookie);
          }
        }
      }

        // 엑세스 토큰으로 현재 Redis 정보 삭제
        refreshTokenService.removeRefreshToken(accessToken);
        return ResponseEntity.ok(StatusResponseDTO.addStatus(200));
    }

    // refreshToken 으로 accessToken 발급
    @PostMapping("/token/refresh")
    public ResponseEntity<TokenResponseStatus> refresh(
        @RequestHeader("Authorization") final String accessToken) {
        System.out.println("refresh token");
//        String tokenWithBearer = accessToken;
        String token = accessToken.substring(7);
        // 액세스 토큰으로 refresh 토큰 객체를 조회
        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByAccessToken(token);
        System.out.println("refresh token 2");

        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        // RefreshToken 이 존재하고 유효한다면 실행
        if (refreshToken.isPresent() && jwtTokenProvider.validateToken(
            refreshToken.get().getRefreshToken())) {
            System.out.println("refresh token 3");
            // RefreshToken 이 존재하고 유효하다면 실행
            RefreshToken resultToken = refreshToken.get();

            // 권한과 아이디를 추출해 새로운 accessToken 을 만듦
            String newAccessToken = jwtTokenProvider.generateToken(authentication).getAccessToken();

            resultToken.updateAccessToken(newAccessToken);
            refreshTokenRepository.save(resultToken);

            System.out.println("여기까지 돌았음");

            // 새로운 accessToken 을 반환해줌
            return ResponseEntity.ok(TokenResponseStatus.addStatus(200, newAccessToken));
        }
        return ResponseEntity.badRequest().body(TokenResponseStatus.addStatus(400, null));
    }

    // Redis

//    @PostMapping("/token/logout")
//    public ResponseEntity<StatusResponseDTO> logout(
//        @RequestHeader("Authorization") final String accessToken) {
//
//        // 엑세스 토큰으로 현재 Redis 정보 삭제
//        refreshTokenService.removeRefreshToken(accessToken);
//        return ResponseEntity.ok(StatusResponseDTO.addStatus(200));
//    }
//
//    @PostMapping("/token/refresh")
//    public ResponseEntity<TokenResponseStatus> refresh(
//        @RequestHeader("Authorization") final String accessToken) {
//        // 액세스 토큰으로 refresh 토큰 객체를 조회
//        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByAccessToken(accessToken);
//
//        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
//
//        // RefreshToken 이 존재하고 유효한다면 실행
//        if (refreshToken.isPresent() && jwtTokenProvider.validateToken(
//            refreshToken.get().getRefreshToken())) {
//            // RefreshToken 이 존재하고 유효하다면 실행
//            RefreshToken resultToken = refreshToken.get();
//
//            // 권한과 아이디를 추출해 새로운 accessToken 을 만듦
//            String newAccessToken = jwtTokenProvider.generateToken(authentication).getAccessToken();
//
//            resultToken.updateAccessToken(newAccessToken);
//            refreshTokenRepository.save(resultToken);
//
//            // 새로운 accessToken 을 반환해줌
//            return ResponseEntity.ok(TokenResponseStatus.addStatus(200, newAccessToken));
//        }
//        return ResponseEntity.badRequest().body(TokenResponseStatus.addStatus(400, null));
//    }
}
