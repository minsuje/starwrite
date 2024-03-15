package starwrite.server.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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

    private final PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsersDetailService usersDetailService;

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

    @Override
    public JwtDTO signIn(String mail, String password) {
        System.out.println("mail > " +  mail);
        System.out.println("password > "+ password);
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(mail, password);

            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            JwtDTO jwtDTO = jwtTokenProvider.generateToken(authentication);

            return jwtDTO;
        } catch (AuthenticationException e) {
            // 사용자 인증 실패 예외 처리
            log.error("Authentication failed: {}", e.getMessage());
            throw new RuntimeException("Authentication failed: Invalid username or password");
        } catch (Exception e) {
            // 다른 예외 상황 처리
            log.error("An unexpected error occurred during authentication: {}", e.getMessage());
            throw new RuntimeException("An unexpected error occurred during authentication");
        }
    }
}
