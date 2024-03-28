package starwrite.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.utils.WebClientServiceImpl;

@Controller
public class ChatAiController {

    @Autowired
    private WebClientServiceImpl webClientService;

    @PostMapping("/user/chatAI")
    public void chatAI(@RequestBody String question) {
        String userId = SecurityUtil.getCurrentUserUserId();
        webClientService.postChatAi(userId, question);
    }

}
