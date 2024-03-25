package starwrite.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    // webClient Bean 등록
    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder
            .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/user") // 호출할 API 서비스 도메인 URL
            .defaultHeaders(httpHeaders -> {
                httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
//                httpHeaders.add("apiKey", "API Key 값 입력");
            })
            // ... 기타 설정 필요하면 추가 ...
            .build();
    }
}
