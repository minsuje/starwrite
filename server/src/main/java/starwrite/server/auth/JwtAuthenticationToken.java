package starwrite.server.auth;

import java.util.Collection;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class JwtAuthenticationToken extends UsernamePasswordAuthenticationToken {
//public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final Object details;

//    public JwtAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, Object details) {
//        super(principal, credentials, authorities);
//        super.setAuthenticated(true);
//        this.details = details;
//
////        super(authorities);
////        super.setAuthenticated(true);
////        this.principal = principal;
////        this.credentials = credentials;
////        this.details = details;
//    }

    public JwtAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, Object details) {
        super(principal, credentials, authorities);
//        System.out.println("jwtAuthenticationToken authorities >>> " + authorities);
        this.details = details;
    }

    @Override
    public Object getDetails() {
        return details;
    }

}
