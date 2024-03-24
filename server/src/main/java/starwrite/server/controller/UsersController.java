package starwrite.server.controller;

import java.time.LocalDateTime;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.entity.Users;
import starwrite.server.repository.UsersRepository;
import starwrite.server.service.MyPageService;

@RestController
public class UsersController {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
  MyPageService myPageService;

    @PostMapping("/register/user")
    public String createUser(@RequestBody Users user) {
        System.out.println("createUser >>>>>>>>>>>> " + user);
        // db에 넣기 전에 비밀번화 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(user.getCreatedAt());

//        return usersRepository.createUser(user.getLogin_type(), user.getMail(), user.getSocialId(),
//            user.getPassword(), user.getProfile_img(), user.getNickname(), user.getRole(),
//            user.getCreatedAt(), user.getUpdatedAt());
        try {
          usersRepository.save(user);
          return "유저 생성되었음";
        } catch(Exception e) {
          return e.getLocalizedMessage();
      }
    }



  @PostMapping("nickCheck")
  public String checNickname(@RequestParam(value = "nickname") String nickname) {

    System.out.println("nickname >>>>>> " + nickname);
    String foundNickname = myPageService.checkNickname(nickname);

   if (foundNickname == null) { // 사용 가능한 닉네임일 때
      return "available";
    } else {
      return "unavailable"; // 사용 불가능한 닉네임일 때
    }
  }

}
