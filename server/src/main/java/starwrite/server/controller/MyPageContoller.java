package starwrite.server.controller;

import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.entity.Users;
import starwrite.server.request.UpdateMypage;
import starwrite.server.response.UpdateMypageResponse;
import starwrite.server.service.MyPageService;

@RestController
@RequestMapping("user/mypage")
public class MyPageContoller {

    private final MyPageService myPageService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    public MyPageContoller(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    // 마이페이지 불러오기
    @GetMapping()
    public Users getMyPage() {
        String userId = SecurityUtil.getCurrentUserUserId();

        return myPageService.getMypage(userId);
    }

    // 마이페이지 닉네임 중복 확인
    @PostMapping("nickCheck")
    public String checNickname(@RequestParam(value = "nickname") String nickname) {
        String userNickname = SecurityUtil.getCurrentUserNickname();

        String foundNickname = myPageService.checkNickname(nickname);

        if (Objects.equals(userNickname, foundNickname)) { // 원래 내 닉네임일 때
            return "no change";
        } else if (foundNickname == null) { // 사용 가능한 닉네임일 때
            return "available";
        } else {
            return "unavailable"; // 사용 불가능한 닉네임일 때
        }
    }

    // 마이페이지에서 유저 정보 수정하기
    @PatchMapping()
    public UpdateMypageResponse updateMyPage(@RequestBody UpdateMypage updateMypage) {
        String originPassword = updateMypage.getOriginPassword();
        String newPassword = updateMypage.getNewPassword();
        String nickname = updateMypage.getNickname();

        UpdateMypageResponse response = new UpdateMypageResponse();

        String userId = SecurityUtil.getCurrentUserUserId();

        // db 에 있는 비밀번호 찾아오기
        String encodedPassword = myPageService.getMypage(userId).getPassword();
        System.out.println("encodedPassword > " + encodedPassword);
        // 비밀번호가 일치하는지 확인
        if (passwordEncoder.matches(originPassword, encodedPassword)) {
            Users updatedUser = myPageService.updateMyPage(userId, newPassword, nickname);
            System.out.println("updatedUser > " + updatedUser);
            response.setPasswordCheck(true);
            response.setNickname(updatedUser.getNickname());
        } else {
            System.out.println("비밀번호 틀렸음");
            response.setPasswordCheck(false);
        }
        return response;
    }

    // 유저 탈퇴하기
    @DeleteMapping
    public String secession() {
        String userId = SecurityUtil.getCurrentUserUserId();

        System.out.println("secession");

        return myPageService.deleteUser(userId);
    }

}
