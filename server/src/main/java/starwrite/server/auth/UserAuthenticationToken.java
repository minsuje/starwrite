//package starwrite.server.auth;
//
//import java.util.Collection;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//
//public class UserAuthenticationToken extends AbstractAuthenticationToken {
//
//    private final String principal;
//    private final String credentials;
//
//    public UserAuthenticationToken(String mail, String password, Collection<? extends GrantedAuthority> authorities) {
//        super(authorities);
//        this.principal = mail;
//        this.credentials = password;
//        super.setAuthenticated(true);
//    }
//
//    @Override
//    public Object getCredentials() {
//        return null;
//    }
//
//    @Override
//    public Object getPrincipal() {
//        return null;
//    }
//}
