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
        Users user = usersRepository.findUserByEmail(mail);
        if(user != null) {
            return User.builder()
                .username(user.getMail())
                .password(passwordEncoder.encode(user.getPassword()))
                .roles(String.valueOf(user.getRole()))
                .build();
        } else {
            throw new UsernameNotFoundException(mail);
        }
    }
}
