package starwrite.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Users;
import starwrite.server.repository.UsersRepository;

@Service
public class UsersDetailService implements UserDetailsService {
    @Autowired
    UsersRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {

        System.out.println("loadUserByUsername");
        Users user = usersRepository.findUserByEmail(mail);

        if(user != null) {
            System.out.println("user >>>>" + user);

            UserDetails users = User.builder()
                .username(user.getMail())
                .password(user.getPassword())
                .roles(String.valueOf(user.getRole()))
                .build();
            System.out.println("users >>>>" + users);

            return users;
        } else {
            throw new UsernameNotFoundException(mail);
        }      // 원본

//        return createUserDetails(usersRepository.findUserByEmail(mail));

//            .map(Post)
//            .map(this::createUserDetails)
//            .orElseThrow(() -> new UsernameNotFoundException("해당하는 회원을 찾을 수 없습니다."));
    }

    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 return
//    private UserDetails createUserDetails(Users user) {
//        System.out.println("createUserDetails user >>>>>>>" + user);
//
//        UserDetails userDetails = User.builder()
//            .username(user.getMail())
//            .password(passwordEncoder.encode(user.getPassword()))
//            .roles(user.getRoles().toArray(new String[0]))
//            .build();
//
//        System.out.println("userDetails >>>>> " + userDetails);
//        return userDetails;
////        return User.builder()
////            .username(user.getUsername())
////            .password(passwordEncoder.encode(user.getPassword()))
////            .roles(user.getRoles().toArray(new String[0]))
////            .build();
//    }
}
