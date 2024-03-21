package starwrite.server.service;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import starwrite.server.dto.UserTokenDTO;
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
//
//            UserDetails users = User.builder()
//                .username(user.getMail())
//                .password(user.getPassword())
//                .roles(String.valueOf(user.getRole()))
//                .build();

            UserTokenDTO users = new UserTokenDTO(
                user.getMail(),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(String.valueOf(user.getRole()))),
                user.getNickname(),
                user.getUserId()
            );

            System.out.println("loadUserByUsername users >>>>" + users);

            return users;
        } else {
            throw new UsernameNotFoundException("해당하는 회원을 찾을 수 없습니다.");
        }
    }
}
