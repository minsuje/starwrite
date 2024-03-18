package starwrite.server.auth;

import java.util.HashMap;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    static final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    static HashMap<String, Object> userDetails = (HashMap<String, Object>) SecurityContextHolder.getContext().getAuthentication().getDetails();
    public static String getCurrentUserNickname() {
        if (authentication == null || authentication.getDetails() == null) {
            throw new RuntimeException("No authentication information.");
        }
        return (String) userDetails.get("nickname");
    }

    public static String getCurrentUserUserId() {
        if (authentication == null || authentication.getDetails() == null) {
            throw new RuntimeException("No authentication information.");
        }
        return (String) userDetails.get("userId");
    }

    public static String getCurrentUserAuth() {
        if (authentication == null || authentication.getDetails() == null) {
            throw new RuntimeException("No authentication information.");
        }
        return (String) userDetails.get("auth");
    }
}
