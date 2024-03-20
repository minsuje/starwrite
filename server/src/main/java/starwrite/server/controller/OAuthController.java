package starwrite.server.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.auth.JwtTokenProvider;
import starwrite.server.dto.OAuthGoogleDTO;
import starwrite.server.repository.RefreshTokenRepository;
import starwrite.server.service.RefreshTokenService;
import starwrite.server.service.UsersService;
import starwrite.server.service.UsersServiceImpl;

@Slf4j
@RestController
@RequiredArgsConstructor
public class OAuthController {

    private final org.slf4j.Logger Logger = LoggerFactory.getLogger(IndexController.class.getName());

    private final RefreshTokenRepository refreshTokenRepository;

    private final RefreshTokenService refreshTokenService;

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    UsersService usersService;

    @Autowired
    private HttpServletResponse response;

    @Autowired
    UsersServiceImpl usersServiceimpl;

    @PostMapping("/login/oauth/google/post")
    public void signIn(@RequestBody OAuthGoogleDTO OAuthGoogleDTO) {
        System.out.println("signin" + OAuthGoogleDTO);
//        String username = logInDTO.getMail();
//        String password = logInDTO.getPassword();
//        JwtDTO jwtDTO = usersServiceimpl.signIn(username, password);
//        System.out.println("jwtDTO >>>>>>>>>" + jwtDTO);
//        log.info("request username = {}, password = {}", username, password);
//        log.info("jwtDTO accessToken = {}, refreshToken = {}", jwtDTO.getAccessToken(),
//            jwtDTO.getRefreshToken());

//        return jwtDTO;
    }

}
