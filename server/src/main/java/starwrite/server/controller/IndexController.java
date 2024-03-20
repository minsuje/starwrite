package starwrite.server.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.dto.JwtDTO;
import starwrite.server.dto.LogInDTO;
import starwrite.server.service.UsersService;
import starwrite.server.service.UsersServiceImpl;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IndexController {

  private final Logger Logger = LoggerFactory.getLogger(IndexController.class.getName());

  @Autowired
  UsersService usersService;

  @Autowired
  UsersServiceImpl usersServiceimpl;

  @Autowired
  private HttpServletResponse response;

  @GetMapping("/home")
  public String handleWelcome() {
    return "home";
  }

  @GetMapping("/admin/home")
  public String handleAdminHome() {
    return "home_admin";
  }

  @GetMapping("/user/home")
  public String handleUserHome() {
    System.out.println("controller nickname >>> " + SecurityUtil.getCurrentUserNickname());
    System.out.println("controller userId >>> " + SecurityUtil.getCurrentUserUserId());
    System.out.println("controller auth >>> " + SecurityUtil.getCurrentUserAuth());
    return "home_user";
  }

//    @GetMapping("/login")
//    public String handleLogin() {
//        return "custom_login";
//    }

  @PostMapping("/login/post")
  public JwtDTO signIn(@RequestBody LogInDTO logInDTO) {
    System.out.println("signin" + logInDTO);
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
    Cookie cookie = new Cookie("nickName", SecurityUtil.getCurrentUserNickname());
    cookie.setMaxAge(60 * 60 * 24 * 7);  // 쿠키 유효 시간 : 1주일
    response.addCookie(cookie);

    return cookie;
  }

  @GetMapping("/test")
  public Authentication authentication(Authentication authentication) {
    return authentication;
  }
}
