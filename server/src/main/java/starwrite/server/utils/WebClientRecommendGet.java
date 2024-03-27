package starwrite.server.utils;

import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class WebClientRecommendGet {


  public Mono<List<Long>> postIdWithNickname(Long postId, String nickname){
    System.out.println(">>>>>> POST ID " + postId + " >>>>>>> Content " + nickname);
    WebClient webClient = WebClient
            .builder()
            .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/")
            .build();

    return webClient
        .get()
        .uri(uriBuilder -> uriBuilder.path("user/recommend")
            .queryParam("postId", postId)
            .queryParam("nickname", nickname)
            .build()
        )
        .retrieve()
        .bodyToMono(Map.class)
        .map(response -> {List<Long> result = (List<Long>) response.get("data");
        return result;
        }).doOnNext(resultList -> log.info("Received data : " + resultList));
//        .subscribe(response -> log.info(response.toString()));

  }

}
