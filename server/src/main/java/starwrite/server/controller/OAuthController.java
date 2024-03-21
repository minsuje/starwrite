package starwrite.server.controller;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import starwrite.server.auth.JwtTokenProvider;
import starwrite.server.dto.GoogleInfResponseDTO;
import starwrite.server.dto.GoogleRequestDTO;
import starwrite.server.dto.GoogleResponseDTO;
import starwrite.server.dto.JwtDTO;
import starwrite.server.dto.OAuthGoogleDTO;
import starwrite.server.repository.RefreshTokenRepository;
import starwrite.server.service.RefreshTokenService;
import starwrite.server.service.UsersService;
import starwrite.server.service.UsersServiceImpl;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173"})
public class OAuthController {

    private final org.slf4j.Logger Logger = LoggerFactory.getLogger(
        IndexController.class.getName());

    private final RefreshTokenRepository refreshTokenRepository;

    private final RefreshTokenService refreshTokenService;

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    UsersService usersService;

    @Autowired
    private HttpServletResponse response;

    @Autowired
    UsersServiceImpl usersServiceimpl;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String googleRedirectUri;

    @PostMapping("/login/oauth/google/post")
    public JwtDTO signIn(@RequestBody OAuthGoogleDTO OAuthGoogleDTO) {
        System.out.println("signin >>>>>>>>> " + OAuthGoogleDTO.getDecodedToken());
        GoogleInfResponseDTO oAuthGoogleDecodedDTO = (GoogleInfResponseDTO) OAuthGoogleDTO.getDecodedToken();

        String username = oAuthGoogleDecodedDTO.getEmail();
        String password = oAuthGoogleDecodedDTO.getSub();  // 비밀 번호 대신 사용자 고유 식별자
        JwtDTO jwtDTO = usersServiceimpl.signIn(username, password);
        System.out.println("jwtDTO >>>>>>>>>" + jwtDTO);
        log.info("request username = {}, password = {}", username, password);
        log.info("jwtDTO accessToken = {}, refreshToken = {}", jwtDTO.getAccessToken(),
            jwtDTO.getRefreshToken());

        return jwtDTO;
    }  //


    @RequestMapping(value = "login/api/v1/oauth2/google", method = RequestMethod.POST)
    public String loginUrlGoogle() throws IOException {
//        String reqUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId
//            + "&redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code&scope=email%20profile%20openid&access_type=offline";

        String reqUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId
            + "&redirect_uri=http://localhost:5173/login&response_type=code&scope=email%20profile%20openid&access_type=offline";

        return reqUrl;

//        response.sendRedirect(reqUrl);
    } // 이거 살리고


    //    @RequestMapping(value="login/oauth2/code/google", method = RequestMethod.GET)
    @GetMapping("login/oauth")
    public String loginGoogle(@RequestParam(value = "code") String authCode) {
        System.out.println("loginGoogle???? " + authCode);
//        authCode = "4%2F0AeaYSHDCWrAyaET_L8pa8QYWPXrczosr2E0NhxHBHd-51gYBy_B9_LU0wyXenRqamZuNhA&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&prompt=none";
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("restTemplate");
        GoogleRequestDTO googleOAuthRequestParam = GoogleRequestDTO
            .builder()
            .clientId(googleClientId)
            .clientSecret(googleClientSecret)
            .code(authCode)
            .redirectUri(googleRedirectUri)
            .grantType("authorization_code").build();
        System.out.println("GoogleRequestDTO >>> " + googleOAuthRequestParam);
        ResponseEntity<GoogleResponseDTO> resultEntity = restTemplate.postForEntity(
            "https://oauth2.googleapis.com/token",
            googleOAuthRequestParam, GoogleResponseDTO.class);
        System.out.println("여기는?");
        String jwtToken = resultEntity.getBody().getId_token();
        System.out.println("jwtToken >> " + jwtToken);
        Map<String, String> map = new HashMap<>();
        map.put("id_token", jwtToken);
        ResponseEntity<GoogleInfResponseDTO> resultEntity2 = restTemplate.postForEntity(
            "https://oauth2.googleapis.com/tokeninfo",
            map, GoogleInfResponseDTO.class);
        String email = resultEntity2.getBody().getEmail();
        System.out.println("email >>>>>>>>>>> " + email);
        return email;
    }
}
