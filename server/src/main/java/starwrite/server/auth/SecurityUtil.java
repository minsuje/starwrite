package starwrite.server.auth;

import java.util.HashMap;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {


  public static String getCurrentUserNickname() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || authentication.getDetails() == null) {
      throw new RuntimeException("No authentication information.");
    }
    HashMap<String, Object> userDetails = (HashMap<String, Object>) authentication.getDetails();
    return (String) userDetails.get("nickname");
  }


    public static String getCurrentUserUserId() {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getDetails() == null) {
            throw new RuntimeException("No authentication information.");
        }
      HashMap<String, Object> userDetails = (HashMap<String, Object>) authentication.getDetails();
        return (String) userDetails.get("userId");
    }

    public static String getCurrentUserAuth() {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getDetails() == null) {
            throw new RuntimeException("No authentication information.");
        }
      HashMap<String, Object> userDetails = (HashMap<String, Object>) authentication.getDetails();
        return (String) userDetails.get("auth");
    }
}
