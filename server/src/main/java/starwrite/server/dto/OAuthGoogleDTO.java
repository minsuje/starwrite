package starwrite.server.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class OAuthGoogleDTO {
    String access_token;
    Object refreshToken;
}
