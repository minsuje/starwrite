package starwrite.server.entity;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import starwrite.server.enums.Role;

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

    private String mail;

    private String socialId;

    private String password;

    private String profile_img;

    private String nickname;

    private Role role;

    private String access_token;

    private String refresh_token;

    @Relationship(type = "OWNS")
    private List<Category> category;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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
    }s
}
