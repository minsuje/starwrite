package starwrite.server.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

@RequiredArgsConstructor
@Slf4j
@Component
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
        FilterChain filterChain) throws IOException, ServletException {
        // 1. Request Header 에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) servletRequest);

        System.out.println("filterChain token >>> " + token);

        // 2. validateToken 으로 토큰 유효성 검사
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장 -> 요청 처리하는 동안 인증 정보 유지
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            System.out.println("authentication" + authentication.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("filterChain authentication >>> " + authentication);
        }
        System.out.println("filterChain servletRequest > " + ((HttpServletRequest) servletRequest).getAuthType());
        filterChain.doFilter(servletRequest, servletResponse); // 다음 필터로 요청 전달
    }

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        System.out.println("resolveToken >>>> " + bearerToken);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            System.out.println("if 문 안");
           return bearerToken.substring(7); // substring -> 문자열 자르기
        }
        return null;
    }
}
