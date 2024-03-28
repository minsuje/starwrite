package starwrite.server.utils;

import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@EnableAsync
@Service
@Slf4j
public class WebClientServiceImpl {

    public void post(Long postId, String title, String content) {
//    Map<String, Object> bodyMap = new HashMap<>();
//    bodyMap.put("starPostId", postId);
//    bodyMap.put("content", content);

        System.out.println("post to lambda postId >>>>>> " + postId);
        System.out.println("post ot lambda content >>>>>> " + content);

        ExchangeStrategies strategies = ExchangeStrategies.builder()
            .codecs(clientCodecConfigurer -> {
                clientCodecConfigurer.defaultCodecs().maxInMemorySize(64 * 1024 * 1024); // 16MB
            })
            .build();

        // webClient 기본 설정
        WebClient webClient =
            WebClient
                .builder()
                .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/")
                .exchangeStrategies(strategies)
                .build();

        // api 요청
        webClient
            .post()
            .uri("user/post")
            .bodyValue(Map.of("starPostId", postId, "title", title, "content", content))
            .retrieve()
            .bodyToMono(Map.class)
            .subscribe(response -> log.info(response.toString()));
    }


    public void postChatAi(String userId, String question) {

        ExchangeStrategies strategies = ExchangeStrategies.builder()
            .codecs(clientCodecConfigurer -> {
                clientCodecConfigurer.defaultCodecs().maxInMemorySize(64 * 1024 * 1024); // 16MB
            })
            .build();

        // webClient 기본 설정
        WebClient webClient =
            WebClient
                .builder()
                .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/")
                .exchangeStrategies(strategies)
                .build();

        // api 요청
        webClient
            .post()
            .uri("user/chatAI")
            .bodyValue(Map.of("userId", userId, "question", question))
            .retrieve()
            .bodyToMono(Map.class)
            .subscribe(response -> log.info(response.toString()));
    }
}
