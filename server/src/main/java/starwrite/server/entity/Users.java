package starwrite.server.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import starwrite.server.enums.Role;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Users")
@EqualsAndHashCode(of = "userId")
public class Users implements UserDetails {

    @Id
    @GeneratedValue(generatorClass = UUIDStringGenerator.class)
    private String userId;

    private String login_type;

    private String provider; // OAuth provider -> 어느 소셜 로그인인지 (예: 네이버, 구글, 카카오)

    private String mail;

    private String socialId;

    private String password;

    private String profile_img;

    private String nickname;

    private Role role;

    private String access_token;

    private String refresh_token;

//    @Relationship(type = "OWNS", direction = Direction.OUTGOING)
//    private List<Category> category;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Builder.Default
    private List<String> roles = new ArrayList<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public Optional<Object> map(Object createUserDetails) {
        return null;
    }
}
