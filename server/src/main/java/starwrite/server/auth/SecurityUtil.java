package starwrite.server.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static Object getCurrentUserInfo() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("securityUtil > " + SecurityContextHolder.getContext().getAuthentication().getDetails());
        if (authentication == null || authentication.getDetails() == null) {
            throw new RuntimeException("No authentication information.");
        }
        return authentication.getDetails();
    }
}
