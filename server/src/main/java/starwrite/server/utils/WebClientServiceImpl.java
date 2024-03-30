package starwrite.server.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

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


    public CompletableFuture<Map<String, Object>> postChatAi(String userId, String question) {
        System.out.println("webservice postChatAI userId > " + userId + " / question > " + question);

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

        CompletableFuture<Map<String, Object>> future = new CompletableFuture<>();

        // api 요청
        webClient
            .post()
            .uri("user/chatAI")
            .bodyValue(Map.of("userId", userId, "question", question))
            .retrieve()
            .bodyToMono(Map.class)
            .subscribe(response -> {
                future.complete(response);
            });
                //log.info(response.toString()));
        return future;
    }


    public void postIdWithNickname(Long postId, String nickname, String userId, String categoryId) {
        System.out.println(">>>>>> POST ID " + postId + " >>>>>>> Content " + nickname);

        ExchangeStrategies strategies = ExchangeStrategies.builder()
            .codecs(clientCodecConfigurer -> {
                clientCodecConfigurer.defaultCodecs().maxInMemorySize(64 * 1024 * 1024); // 16MB
            })
            .build();


        WebClient webClient = WebClient
            .builder()
            .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/")
            .build();

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("postId", postId);
        requestBody.put("nickname", nickname);
        requestBody.put("userId", userId);
        requestBody.put("categoryId", categoryId);

        CompletableFuture<Map<String, Object>> future = new CompletableFuture<>();

        webClient
            .post()
            .uri("user/recommend/")
            .body(Mono.just(requestBody), Map.class)
            .retrieve()
            .bodyToMono(Map.class)
//        .map(response -> {
//          List<Long> result = (List<Long>) response.get("data");
//          return result;r
//        })
//            .doOnNext(resultList -> log.info("Received data : " + resultList))
            .subscribe(response -> {
                future.complete(response);
                System.out.println("response > " +  response);
            });
//        .subscribe(response -> log.info(response.toString()));


//        webClient
//            .post()
//            .uri("user/chatAI")
//            .bodyValue(Map.of("userId", userId, "question", question))
//            .retrieve()
//            .bodyToMono(Map.class)
//            .subscribe(response -> {
//                future.complete(response);
//            });

//        System.out.println("future >>>>>>>>>>>> " + future);
//        return future;
    }
}
