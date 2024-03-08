package starwrite.server.config;

import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity //스프링 시큐리티 필터가 스프링 필터체인에 등록 됩니다.
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable()
            .authorizeHttpRequests(request -> request
                .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                .anyRequest().authenticated()	// 어떠한 요청이라도 인증필요
            )
            .formLogin(login -> login	// form 방식 로그인 사용
                .loginPage("loginForm")	// [A] 커스텀 로그인 페이지 지정
                .loginProcessingUrl("/login")	// [B] submit 받을 url
                .usernameParameter("userid")	// [C] submit할 아이디
                .passwordParameter("pw")	// [D] submit할 비밀번호
                .defaultSuccessUrl("/main", true)
                .permitAll() // 대시보드 이동이 막히면 안되므로 얘는 허용
            )
            .logout(Customizer.withDefaults());	// 로그아웃은 기본설정으로 (/logout으로 인증해제)

        return http.build();
    }

//        http
//            .csrf((csrfConfig) ->
//                csrfConfig.disable()
//            )
//            .headers((headerConfig) ->
//                headerConfig.frameOptions(frameOptionsConfig ->
//                    frameOptionsConfig.disable()
//                )
//            )
//            .authorizeHttpRequests((authorizeRequests) ->
//                authorizeRequests
//                    .requestMatchers(PathRequest.toH2Console()).permitAll()
//                    .requestMatchers("/", "/login/**").permitAll()
//                    .requestMatchers("/user/**").hasRole(Role.USER.name())
//                    .requestMatchers("/admin/**").hasRole(Role.ADMIN.name())
//                    .anyRequest().authenticated()
//            )
//            .exceptionHandling((exceptionConfig) ->
//                exceptionConfig.authenticationEntryPoint(unauthorizedEntryPoint).accessDeniedHandler(accessDeniedHandler)
//            )
//            .formLogin((formLogin) ->
//                formLogin
//                    .loginPage("/login/login")
//                    .usernameParameter("username")
//                    .passwordParameter("password")
//                    .loginProcessingUrl("/login/login-proc")
//                    .defaultSuccessUrl("/", true)
//            )
//            .logout((logoutConfig) ->
//                logoutConfig.logoutSuccessUrl("/")
//            )
//            .userDetailsService();
//        return http.build();
//    }
}
