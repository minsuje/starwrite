package starwrite.server.utils;

import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@EnableAsync
@Service
@Slf4j
public class WebClientServiceImpl {
  public void post(Long postId, String content) {
//    Map<String, Object> bodyMap = new HashMap<>();
//    bodyMap.put("starPostId", postId);
//    bodyMap.put("content", content);

    System.out.println("post to lambda postId >>>>>> " + postId);
    System.out.println("post ot lambda content >>>>>> " + content);

    // webClient 기본 설정
    WebClient webClient =
        WebClient
            .builder()
            .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/")
            .build();

    // api 요청
    webClient
        .post()
        .uri("user/post")
        .bodyValue(Map.of("starPostId", postId, "content", content))
        .retrieve()
        .bodyToMono(Map.class)
        .subscribe(response -> log.info(response.toString()));

  }
}
