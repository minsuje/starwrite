package starwrite.server.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import starwrite.server.auth.JwtTokenProvider;
import starwrite.server.dto.JwtDTO;
import starwrite.server.repository.UsersRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsersServiceImpl implements UsersService {

    private final UsersRepository usersRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    private final UsersDetailService usersDetailService;

    //@Transactional
//    @Override
//    public JwtDTO signIn(String mail, String password) {
//        // 1. username + password 를 기반으로 Authentication 객체 생성
//        // authentication 은 인증 여부를 확인하는 authenticated 값이 false
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(mail, password);
//        System.out.println("service 1 >>>>> " + authenticationToken);
//        // 2. 실제 검증. authenticate() 매서드를 통해 요청된 User 에 대한 검증 진행
//        // authenticate 메서드가 실행될 때 UsersDetailService 에서 만든 loadUserByUsername 메서드 실행
//        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//
//        System.out.println("service 2 >>>>> " + mail + password);
//        // 3. 인증 정보를 기반으로 jwt 토큰 생성
//        JwtDTO jwtDTO = jwtTokenProvider.generateToken(authentication);
//
//        System.out.println("service 3 >>>>> " + mail + password);
//
//        return jwtDTO;
//    }   /// origin

    // 기존 코드
//    @Override
//    public JwtDTO signIn(String mail, String password) {
//        try {
//            // 1. username + password 를 기반으로 Authentication 객체 생성
//            // authentication 은 인증 여부를 확인하는 authenticated 값이 false
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                mail, password);
//
//            // 2. 실제 검증. authenticate() 매서드를 통해 요청된 User 에 대한 검증 진행
//            // authenticate 메서드가 실행될 때 UsersDetailService 에서 만든 loadUserByUsername 메서드 실행
////            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//
////            System.out.println("signIn authenticationToken >>>>>> " + authenticationToken);
//
//            Authentication authentication = authenticationManager.authenticate(authenticationToken);
////            System.out.println("authentication >>> " + authentication);
//
//            // 3. 인증 정보를 기반으로 jwt 토큰 생성
//            JwtDTO jwtDTO = jwtTokenProvider.generateToken(authentication);
//
//            HttpHeaders httpHeaders = new HttpHeaders();
//            httpHeaders.setBearerAuth(jwtDTO.getAccessToken());
//            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//
////            log.info("httpHeaders = {}", httpHeaders);
//
//            return jwtDTO;
//        } catch (AuthenticationException e) {
//            System.out.println("AuthenticationException e > " +  e);
//
////            org.springframework.security.authentication.BadCredentialsException: Bad credentials
//            // 사용자 인증 실패 예외 처리
//            log.error("Authentication failed: {}", e.getMessage());
//            throw new RuntimeException("Authentication failed: Invalid username or password");
//        } catch (Exception e) {
//            // 다른 예외 상황 처리
//            log.error("An unexpected error occurred during authentication: {}", e.getMessage());
//            throw new RuntimeException("An unexpected error occurred during authentication");
//        }
//    }


    @Override
    public JwtDTO signIn(String mail, String password) {
        try {
            // 사용자가 존재하는지 확인하기 위해 UserDetailsService 사용
            UserDetails userDetails = usersDetailService.loadUserByUsername(mail);

            // 인증 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, password, userDetails.getAuthorities());

            // 실제 검증
            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            // 인증 정보를 기반으로 jwt 토큰 생성
            JwtDTO jwtDTO = jwtTokenProvider.generateToken(authentication);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setBearerAuth(jwtDTO.getAccessToken());
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);

            return jwtDTO;
        } catch (UsernameNotFoundException e) {
            System.out.println("UsernameNotFoundException e > " + e);

            // 사용자가 존재하지 않는 경우 예외 처리
            log.error("Authentication failed: {}", e.getMessage());
            throw new RuntimeException("Authentication failed: User not found");
        } catch (AuthenticationException e) {
            System.out.println("AuthenticationException e > " + e);

            // 잘못된 비밀번호를 입력한 경우 예외 처리
            log.error("Authentication failed: {}", e.getMessage());
            throw new RuntimeException("Authentication failed: Invalid password");
        } catch (Exception e) {
            // 다른 예외 상황 처리
            log.error("An unexpected error occurred during authentication: {}", e.getMessage());
            throw new RuntimeException("An unexpected error occurred during authentication");
        }
    }
}
