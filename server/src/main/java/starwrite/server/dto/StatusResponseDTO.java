package starwrite.server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonInclude(Include.NON_NULL) // DTO 를 JSON으로 변환 시 null값인 field 제외
public class StatusResponseDTO {
    private Integer status;
    private Object data;

    public StatusResponseDTO(Integer status) {
        this.status = status;
    }

    public static StatusResponseDTO addStatus(Integer status) {
        return new StatusResponseDTO(status);
    }

    public static StatusResponseDTO success() {
        return new StatusResponseDTO(200);
    }

    public static
}
