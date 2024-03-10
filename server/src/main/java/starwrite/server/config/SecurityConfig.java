package starwrite.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import starwrite.server.AuthenticationSuccessHandler;
import starwrite.server.service.UsersDetailService;

@Configuration
@EnableWebSecurity // 전체 보안이 활성화되어야 한다는 것을 의미
public class SecurityConfig {
    @Autowired
    UsersDetailService usersDetailService;

    @Bean // securityFilterChain 통해서 HTTP 보안에 엑세스 할 수 있음
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            .csrf(AbstractHttpConfigurer::disable) // cross-site request forgery : 사이트 간 재위조 방지 기술
            .authorizeHttpRequests(registry -> {
                registry.requestMatchers("/home", "/register/**").permitAll(); // 홈은 누구나 접근할 수 있다는 의미
                registry.requestMatchers("/admin/**").hasRole("ADMIN"); // /admin url 은 관리자 권한 가진 사람만 접근 가능
                registry.requestMatchers("/user/**").hasRole("USER");
                registry.anyRequest().authenticated(); // 위에 언급하지 않은 3가지 요청 외에는 허용되지 않는다는 의미.
            })
            .formLogin(httpSecurityFormLoginConfigurer -> {
                httpSecurityFormLoginConfigurer
                    .loginPage("/login")
                    .successHandler(new AuthenticationSuccessHandler()) // 인증이 성공하면 다음에 수행할 작업을 사용자 정의할 수 있음
                    .permitAll();
            }) // 따로 로그인 양식 제공해주는 옵션 -> 로그인 페이지는 누구나 접근할 수 있도록
            .build();
    }

//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails normalUser = User.builder()
//            .username("user")
//            .password("$2a$12$H4jHiCkH.IfjbhPuNZjOxOZRWyj3lPdysMCPGj4ede2UdOH.3sYx6") // 1234
//            .roles("USER")
//            .build();
//
//        UserDetails adminUser = User.builder()
//            .username("admin")
//            .password("$2a$12$Kb5yrb2UnHoib3hfi2VnmuvHlBSNm1qBes5n6W9meR4xAXrK/1L2O") // 5678
//            .roles("ADMIN", "USER")
//            .build();
//        return new InMemoryUserDetailsManager(normalUser, adminUser);
//    }

    @Bean
    public UserDetailsService userDetailsService() {
        return usersDetailService;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(); // 데이터 액세스 객체
        provider.setUserDetailsService(usersDetailService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
