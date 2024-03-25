package starwrite.server.utils;

import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Controller
public class PythonApi {
//    WebClient client = WebClient.builder()
//        .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/user")
//        .defaultCookie("cookieKey", "cookieValue")
//        .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//        .defaultUriVariables(Collections.singletonMap("url",
//            "https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/user"))
//        .build();

    private final WebClient webClient;

    public PythonApi(WebClient webClient) {
        this.webClient = webClient;
    }

    public Flux<String> parsePost(Long postId, String content) {

        System.out.println("pythonApi >>> " + postId + content);

        return webClient.post()
            .uri("/post")
            .bodyValue(Map.of("postId", postId, "content", content))
            .retrieve()
            .bodyToFlux(String.class);
    }
}
