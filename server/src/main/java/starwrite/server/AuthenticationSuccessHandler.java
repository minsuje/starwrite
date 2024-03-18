package starwrite.server;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws ServletException, IOException {
        System.out.println("onAuthenticationSuccess request   >  " + request);
        System.out.println("onAuthenticationSuccess authentication >  " + authentication);
        boolean isAdmin = authentication.getAuthorities().stream()
            .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin) {
            setDefaultTargetUrl("/admin/home"); // 로그인 성공한 후에 어떤 URL 을 사용해야 하는지 지정할 수 있음
        } else {
            setDefaultTargetUrl("/user/home");
        }

        super.onAuthenticationSuccess(request, response, authentication);
    }
}
