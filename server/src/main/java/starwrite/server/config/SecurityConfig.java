package starwrite.server.config;

import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import starwrite.server.auth.JwtAuthenticationFilter;
import starwrite.server.auth.JwtTokenProvider;
import starwrite.server.service.CustomOAuth2UserService;
import starwrite.server.service.UsersDetailService;

@Configuration
@EnableWebSecurity // 전체 보안이 활성화되어야 한다는 것을 의미
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    UsersDetailService usersDetailService;

    @Autowired
    PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;

    private final CustomOAuth2UserService customOAuth2UserService;

    CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedHeaders(Collections.singletonList("*"));
            config.setAllowedMethods(Collections.singletonList("*"));
            config.setAllowedOriginPatterns(
                Collections.singletonList("http://localhost:5173")); // 허용할 origin
            config.setAllowCredentials(true);
            return config;
        };
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() { // security를 적용하지 않을 리소스
        return web -> web.ignoring()
            // error endpoint를 열어줘야 함, favicon.ico 추가!
            .requestMatchers("/error", "/favicon.ico");
    }

    @Bean // securityFilterChain 통해서 HTTP 보안에 엑세스 할 수 있음
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            // Basic 인증 사용하지 않음
            .httpBasic(AbstractHttpConfigurer::disable)
            // cors 설정
            .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))
            // cross-site request forgery -> 사이트 간 재위조 방지 기술
            .csrf(AbstractHttpConfigurer::disable)
            // JWT 를 사용하기 때문에 세션을 사용하지 않음
            .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(registry -> {
//                registry.requestMatchers("/**").permitAll(); // 일단 다 개방 - 나중에 밑에 3개로 변경\
                registry.requestMatchers("/home", "/register/**", "/login/**").permitAll();  // 홈은 누구나 접근할 수 있다는 의미
//                registry.requestMatchers("/user/**").hasAnyAuthority("USER", "ADMIN");
//                registry.requestMatchers("/admin/**").hasRole("ADMIN"); // /admin url 은 관리자 권한 가진 사람만 접근 가능
                registry.requestMatchers("/user/**").hasAnyAuthority("USER", "ADMIN");
                registry.requestMatchers("/admin/**").hasAuthority("ADMIN");
                registry.anyRequest().authenticated(); // 위에 언급하지 않은 3가지 요청 외에는 허용되지 않는다는 의미.
            })
            .formLogin(httpSecurityFormLoginConfigurer -> {
                httpSecurityFormLoginConfigurer
                    .loginPage("/login")
                    // 인증이 성공하면 다음에 수행할 작업을 사용자 정의할 수 있음
//                    .successHandler(new AuthenticationSuccessHandler())
                    .permitAll();
            }) // 따로 로그인 양식 제공해주는 옵션 -> 로그인 페이지는 누구나 접근할 수 있도록
//            .oauth2Login(oauth -> // OAuth2 로그인 기능에 대한 여러 설정의 진입점
//                // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때의 설정을 담당
//                oauth.userInfoEndpoint(c -> c.userService(customOAuth2UserService))
//                    // 로그인 성공 시 핸들러
//                    .successHandler(oAuth2SuccessHandler)
//            )
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                UsernamePasswordAuthenticationFilter.class)
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
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

//    @Bean
//    public AuthenticationManager authenticationManager(
//        UsersDetailService usersDetailService,
//        PasswordEncoder passwordEncoder) {
//        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
//        authenticationProvider.setUserDetailsService(usersDetailService);
//        authenticationProvider.setPasswordEncoder(passwordEncoder);
//
////        ProviderManager providerManager = new ProviderManager(authenticationProvider);
////        providerManager.setEraseCredentialsAfterAuthentication(false);
////
////        return providerManager;
//
//        return new ProviderManager(authenticationProvider);
//    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return new ProviderManager(authenticationProvider()); // ProviderManager를 사용하여 인증 매니저 빈 등록
    }
}

