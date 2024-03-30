package starwrite.server.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@EnableAsync
@Service
@Slf4j
public class WebClientRecommendGet {


//  public CompletableFuture<Map<String, Object>> postIdWithNickname(Long postId, String nickname,
//      String userId, String categoryId) {
//    System.out.println(">>>>>> POST ID " + postId + " >>>>>>> Content " + nickname);
//    WebClient webClient = WebClient
//        .builder()
//        .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/")
//        .build();
//
//    Map<String, Object> requestBody = new HashMap<>();
//    requestBody.put("postId", postId);
//    requestBody.put("nickname", nickname);
//    requestBody.put("userId", userId);
//    requestBody.put("categoryId", categoryId);
//
//    CompletableFuture<Map<String, Object>> future = new CompletableFuture<>();
//
//    webClient
//        .post()
//        .uri("user/recommend")
//        .body(Mono.just(requestBody), Map.class)
//        .retrieve()
//        .bodyToMono(Map.class)
////        .map(response -> {
////          List<Long> result = (List<Long>) response.get("data");
////          return result;
////        })
//        .doOnNext(resultList -> log.info("Received data : " + resultList))
//        .subscribe(response -> {
//          future.complete(response);
//        });
////        .subscribe(response -> log.info(response.toString()));
//
//    System.out.println("future >>>>>>>>>>>> " + future);
//    return future;
//  }
//    webClient
//        .post()
//        .uri("user/chatAI")
//        .bodyValue(Map.of("userId", userId, "question", question))
//        .retrieve()
//        .bodyToMono(Map.class)
//        .subscribe(response -> {
//          future.complete(response);
//        });
//    //log.info(response.toString()));
//    return future;

  }

