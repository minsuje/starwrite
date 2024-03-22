package starwrite.server.request;

import lombok.Data;

@Data
public class UpdateMypage {
    String originPassword;
    String newPassword;
    String nickname;
}
