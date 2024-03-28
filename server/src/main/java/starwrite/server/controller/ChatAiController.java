package starwrite.server.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.utils.WebClientServiceImpl;

@RestController
public class ChatAiController {

    @Autowired
    private WebClientServiceImpl webClientService;

    @PostMapping("user/chatAI")
    public Object chatAI(@RequestBody String requestBody) {
        System.out.println("user/chatAI controller > " );
//        String userId = SecurityUtil.getCurrentUserUserId();
//        webClientService.postChatAi(userId, question);

        try {
            // ObjectMapper를 사용하여 JSON 문자열 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(requestBody);

            // "question" 키를 사용하여 질문 추출
            String question = jsonNode.get("question").asText();

            // 추출한 질문 사용
            System.out.println("user/chatAI controller > " + question);

            // 이하 로직
            String userId = SecurityUtil.getCurrentUserUserId();

            CompletableFuture<Map<String, Object>> futureResponse = webClientService.postChatAi(userId, question);
            Map<String, Object> response = futureResponse.join();
            System.out.println("controller response > " + response.get("body"));

            return response.get("body");
        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace();
            return new String[]{"error"};
        }
    }

}
