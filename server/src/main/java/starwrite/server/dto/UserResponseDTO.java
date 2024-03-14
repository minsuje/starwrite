package starwrite.server.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import starwrite.server.entity.Users;

@Getter
@NoArgsConstructor
@ToString
public class UserResponseDTO {
    private String mail;
    private String password;
    private Boolean isValid;

    @Builder
    public UserResponseDTO(String mail, String password, Boolean isValid) {
        this.mail = mail;
        this.password = password;
        this.isValid = isValid;
    }

    public static UserResponseDTO from(Users users) {
        return UserResponseDTO.builder()
            .mail(users.getMail())
            .password(users.getPassword())
            .build();
    }

}
