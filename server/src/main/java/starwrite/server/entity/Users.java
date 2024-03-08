package starwrite.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import starwrite.server.enums.Role;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class) // 엔티티를 DB에 적용하기 전, 이후에 커스텀 콜백을 요청할 수 있는 어노테이션
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String login_type;

    @Column(unique=true)
    private String email;

    @Column(unique=true)
    private String socialId;

    private String password;

    private String profile_img;

    @Column(unique=true)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String access_token;

    private String refresh_token;

    @NotNull
    @CreatedDate
    private LocalDateTime created_at;

    @NotNull
    @LastModifiedDate
    private LocalDateTime updated_at;

    @Builder
    public Users(
        String login_type, String nickname, String socialId, String password, String email, String profile_img, Role role, String access_token, String refresh_token){
        this.login_type = login_type;
        this.nickname = nickname;
        this.socialId = socialId;
        this.password = password;
        this.email = email;
        this.profile_img = profile_img;
        this.role = role;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }
}
