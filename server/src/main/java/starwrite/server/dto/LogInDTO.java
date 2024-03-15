package starwrite.server.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class LogInDTO {
    private String mail;
    private String password;
}
