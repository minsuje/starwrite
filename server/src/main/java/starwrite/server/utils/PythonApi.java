//package starwrite.server.utils;
//
//import java.util.Map;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Flux;
//
//@Controller
//public class PythonApi {
////    WebClient client = WebClient.builder()
////        .baseUrl("https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/user")
////        .defaultCookie("cookieKey", "cookieValue")
////        .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
////        .defaultUriVariables(Collections.singletonMap("url",
////            "https://eluaiy9gg5.execute-api.ap-northeast-2.amazonaws.com/ai/user"))
////        .build();
//
//  @Autowired
//  WebClient webClient;
//
//  @Autowired
//    public PythonApi(WebClient webClient) {
//        this.webClient = webClient;
//    }
//
//    public Flux<String> parsePost(Long postId, String title, String content) {
//
//        System.out.println("pythonApi >>> " + postId + " " + content);
//
//        return webClient.post()
//            .uri("/post")
//            .bodyValue(Map.of("starPostId", postId, "title", title, "content", content))
//            .retrieve()
//            .bodyToFlux(String.class);
//    }
//
//    public Flux<String> chatAI(String question) {
//
//        return webClient.post()
//            .uri("/chatAI")
//            .bodyValue(Map.of("question" , question))
//            .retrieve()
//            .bodyToFlux(String.class);
//    }
//}
