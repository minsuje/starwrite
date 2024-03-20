package starwrite.server.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class GoogleInfResponseDTO {
    String iss;
    String azp;
    String aud;
    String sub;
    String email;
    Boolean email_verified;
    Long nbf;
    String name;
    String picture;
    String given_name;
    String family_name;
    Long iat;
    Long exp;
    String jti;
}
