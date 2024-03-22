package starwrite.server.response;

import lombok.Data;

@Data
public class UpdateMypageResponse {
    Boolean passwordCheck;
    String nickname;
}
