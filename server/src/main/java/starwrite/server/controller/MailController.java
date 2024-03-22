package starwrite.server.controller;

import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.dto.EmailDTO;
import starwrite.server.service.MailService;

@RestController
@RequiredArgsConstructor
public class MailController {
    private final MailService  mailService;
    private int number; // 이메일 인증 숫자를 저장하는 변수

    // 인증 이메일 전송
    @PostMapping("/mail/send")
    public HashMap<String, Object> mailSend(@RequestBody EmailDTO mail) {
        System.out.println("mail >>> " + mail.getMail());

        HashMap<String, Object> map = new HashMap<>();
        // 이메일 중복인지 확인
        if (mailService.doubleCheck(mail.getMail()) == null) {

            try {
                number = mailService.sendMail(mail.getMail());
                String num = String.valueOf(number);

                map.put("success", Boolean.TRUE);
                map.put("number", num);
            } catch (Exception e) {
                map.put("success", Boolean.FALSE);
                map.put("error", e.getMessage());
            }
            return map;
        } else {
            System.out.println("이미 있는 사용자입니다.");
            map.put("fail", "duplicate email");
            return  map;
        }
    }

    // 인증번호 일치 여부 확인
    @GetMapping("/mail/check")
    public ResponseEntity<?> mailCheck(@RequestParam String userNumber) {
        boolean isMatch = userNumber.equals(String.valueOf(number));

        return ResponseEntity.ok(isMatch);
    }
}
