package starwrite.server.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import starwrite.server.dto.JwtDTO;
import starwrite.server.dto.UserTokenDTO;
import starwrite.server.service.RefreshTokenService;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;

    //Base64.getEncoder().encodeToString("your-secret-key".getBytes())
    // application.properties 에서 jwt.secret 값 가져와서 key 에 저장
    public JwtTokenProvider(@Value("${jwt.secret.key}") String secretKey) {

        System.out.println("secret >>>>>>>>>>>>>>>> " + secretKey);
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        System.out.println("keybyte >>>>>>>>>>>>>>>> " + Arrays.toString(keyBytes));
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // User 정보를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
    public JwtDTO generateToken(Authentication authentication) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthentication = (UsernamePasswordAuthenticationToken) authentication;
//        System.out.println("JwtTokenProvider generateToken > " + authentication);

//        System.out.println("usernamePasswordAuthentication >>>> " + usernamePasswordAuthentication);
//        System.out.println("userDetails  getPrincipal >>> " + usernamePasswordAuthentication.getPrincipal());
//        System.out.println("userDetails >>> " + usernamePasswordAuthentication.getPrincipal().getClass().getName());

        UserTokenDTO userDetails = (UserTokenDTO) usernamePasswordAuthentication.getPrincipal();

//        User userPrincipal = (User) authentication.getPrincipal(); // 주체 객체가 User 클래스인지 확인하고 캐스팅


//        System.out.println("userDetails >>> " + usernamePasswordAuthentication.getAuthorities());
        // 권한 가져오기
//        String authorities = authentication.getAuthorities().stream()
//            .map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));
//        String authorities = authentication.getAuthorities().toString();

        StringBuilder authoritiesBuilder = new StringBuilder();
        for (GrantedAuthority authority : usernamePasswordAuthentication.getAuthorities()) {
            authoritiesBuilder.append(authority.getAuthority()).append(" ");
        }
        String authorities = authoritiesBuilder.toString().trim();
//
//        String authorities = authentication.getAuthorities().stream()
//            .collect(Collectors.joining(" "));
//        System.out.println("authorities >>>>>>>>> " + authorities);
        long now = (new Date()).getTime();

        // AccessToken 생성
        Date accessTokenExpiresIn = new Date(now + 1000L * 60L * 60L * 24L); // 1일
//        Date accessTokenExpiresIn = new Date(now + 1000L * 60L); // 60초
        String accessToken = Jwts.builder()
            .setSubject(usernamePasswordAuthentication.getName())
            .claim("auth", authorities)
            .claim("nickname", userDetails.getNickname()) // nickname을 claim으로 추가
            .claim("userId", userDetails.getUserId()) // userId를 claim으로 추가
            .setExpiration(accessTokenExpiresIn)
            .signWith(key, SignatureAlgorithm.HS256).compact();

//        System.out.println("key >>>>>>>>>>> " + key);

        // RefreshToken 생성
        String refreshToken = Jwts.builder()
            .setExpiration(new Date(now + 1000L * 60L * 60L * 24L * 14)) // 14일
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

//        System.out.println("refreshToken >>>>>>>>>>>> " + refreshToken);

//        String accessToken = accessToken(authentication, userDetails, authorities);
//        String refreshToken = refreshToken();

        // 토큰을 Redis에 저장한다. ---------------------
        RefreshTokenService.saveTokenInfo(authentication.getName(), refreshToken, accessToken);
//        String new GeneratedToken(accessToken, refreshToken);

        return JwtDTO.builder()
            .grantType("Bearer")
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

//    // AccessToken 생성
//    public String accessToken(Authentication authentication, UserTokenDTO userDetails,
//        String authorities) {
//        long now = (new Date()).getTime();
//        Date accessTokenExpiresIn = new Date(now + 1000L * 60L * 60L * 24L); // 1일
////        Date accessTokenExpiresIn = new Date(now + 1000L * 60L); // 60초
//        String accessToken = Jwts.builder()
//            .setSubject(authentication.getName())
//            .claim("auth", authorities)
//            .claim("nickname", userDetails.getNickname()) // nickname을 claim으로 추가
//            .claim("userId", userDetails.getUserId()) // userId를 claim으로 추가
//            .setExpiration(accessTokenExpiresIn)
//            .signWith(key, SignatureAlgorithm.HS256).compact();
//
//        return accessToken;
//    }
//
//    // RefreshToken 생성
//    public String refreshToken() {
//        long now = (new Date()).getTime();
//        String refreshToken = Jwts.builder()
//            .setExpiration(new Date(now + 1000L * 60L * 60L * 24L * 14)) // 14일
//            .signWith(key, SignatureAlgorithm.HS256)
//            .compact();
//        return refreshToken;
//    }

    // Jwt 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
//        System.out.println("jwtTokenProvider getAuthentication" + accessToken);
        // jwt 토큰 복호화
        Claims claims = parseClaims(accessToken);
        // Claim 이란? 사용자에 대한 프로퍼티나 속성. 토큰 자체가 정보를 가지고 있는 방식

//        System.out.println("getAuthentication claims >>" + claims);

        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities = Arrays.stream(
                claims.get("auth").toString().split(","))
            .map(SimpleGrantedAuthority::new).collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication return
        // UserDetails: intercae, User: UserDetails를 구현한 class
        UserDetails principal = new User(claims.getSubject(), "", authorities);
//        System.out.println("getAuthentication authorities > " + authorities);

        // Additional information
        Map<String, Object> additionalInfo = new HashMap<>();
        additionalInfo.put("nickname", claims.get("nickname")); // 닉네임 추가
        additionalInfo.put("userId", claims.get("userId")); // 유저 아이디 추가
        additionalInfo.put("auth", claims.get("auth"));

//       return new UsernamePasswordAuthenticationToken(principal, "", authorities);
//
//        // JwtAuthenticationToken에 추가 정보를 포함하여 반환
        return new JwtAuthenticationToken(principal, "", authorities, additionalInfo);
    }

    // 토큰 정보를 검증하는 메서드
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("UnsupportedJwtException", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty", e);
        }
        return false;
    }

    // accessToken 토큰 복호화
    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
