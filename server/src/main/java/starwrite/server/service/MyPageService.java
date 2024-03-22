package starwrite.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Users;
import starwrite.server.repository.UsersRepository;

@Service
public class MyPageService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Users getMypage(String userId) {
        return usersRepository.findUserByUserId(userId);
    }

    // 닉네임 중복인지 확인
    public String checkNickname(String nickname) {
        return usersRepository.findUserByNickname(nickname);
    }

    public Users updateMyPage(String userId, String newPassword, String nickname) {
        System.out.println("newPassword" + newPassword);
        if (newPassword != null) { // 비밀번호도 변경
            System.out.println("비밀번호 변경?");
            String password = passwordEncoder.encode(newPassword);
            System.out.println(password);
            return usersRepository.updateUserPassword(userId, password, nickname);
        } else {
            return usersRepository.updateUserNickname(userId, nickname);
        }
    }

    // 탈퇴
    public String deleteUser (String userId) {
        int deletedCount = usersRepository.deleteUser(userId);
        if (deletedCount == 0) {
            return "nothing deleted";
//      throw new RuntimeException("삭제 실패");
        }
        return "deleted";
    }
}
