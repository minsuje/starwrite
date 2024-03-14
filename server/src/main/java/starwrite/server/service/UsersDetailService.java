package starwrite.server.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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

//        System.out.println("loadUserByUsername");
//        Users user = usersRepository.findUserByEmail(mail);
//
//        if(user != null) {
//            System.out.println("user >>>>" + user);
//
//            UserDetails users = User.builder()
//                .username(user.getMail())
//                .password(passwordEncoder.encode(user.getPassword()))
//                .roles(String.valueOf(user.getRole()))
//                .build();
//            System.out.println("users >>>>" + users);
//
//            return users;
//        } else {
//            throw new UsernameNotFoundException(mail);
//        }      // 원본

//        return usersRepository.findUserByEmail(mail).
//            .map(user -> createUser(mail, user))
//            .orElseThrow(() -> new UsernameNotFoundException(mail + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    private org.springframework.security.core.userdetails.User createUser(String mail, User user) {
        if (!user.isEnabled()) {
            throw new RuntimeException(mail + " -> 활성화되어 있지 않습니다.");
        }

        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
            .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getUsername(),
            user.getPassword(),
            grantedAuthorities);
    }
}
