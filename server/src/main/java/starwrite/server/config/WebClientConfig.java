package starwrite.server.config;

import java.net.http.HttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;

@Configuration
public class WebClientConfig {


    // webClient Bean 등록
    @Bean
    public WebClient webClient(WebClient.Builder builder) {

      System.out.println("webClient 요청 보내기 직전");
        return builder
            .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/user/post") // 호출할 API 서비스 도메인 URL
            .defaultHeaders(httpHeaders -> {
                httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
//                httpHeaders.add("apiKey", "API Key 값 입력");
            })
            // ... 기타 설정 필요하면 추가 ...
            .build();
    }
}
