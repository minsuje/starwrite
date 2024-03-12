package starwrite.server.dto;

import java.time.LocalDateTime;
import lombok.Data;
import starwrite.server.enums.Role;

@Data
public class UserDTO {
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

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}
