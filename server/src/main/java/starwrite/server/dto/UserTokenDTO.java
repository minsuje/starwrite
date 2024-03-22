package starwrite.server.dto;

import java.util.Collection;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserTokenDTO implements UserDetails {

//    private final String nickname;
//    private final String userId;
//
//    public UserTokenDTO(String username, String password, Collection<? extends GrantedAuthority> authorities, String nickname, String userId) {
//        super(username, password, authorities);
//        this.nickname = nickname;
//        this.userId = userId;
//    }
//
//    public String getNickname() {
//        return nickname;
//    }
//
//    public String getUserId() {
//        return userId;
//    }

    private final String username;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    @Getter
    @Setter
    private final String nickname;

    @Getter
    @Setter
    private final String userId;

    public UserTokenDTO(String username, String password, Collection<? extends GrantedAuthority> authorities, String nickname, String userId) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.nickname = nickname;
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}