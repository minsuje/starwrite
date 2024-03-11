package starwrite.server.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Users;
import starwrite.server.repository.UsersRepository;

@Service
public class UsersDetailService implements UserDetailsService {
    @Autowired
    UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> user = usersRepository.findByEmail(email);
        if(user.isPresent()) {
            var userObj = user.get();
            return User.builder()
                .username(userObj.getEmail())
                .password(userObj.getPassword()) // 5678
                .roles(String.valueOf(userObj.getRole()))
//                .roles(getRoles(userObj))
                .build();
        } else {
            throw new UsernameNotFoundException(email);
        }
    }

//    private String[] getRoles(Users user) {
//         if(user.getRole() == null) {
//             return new String[]{"USER"};
//         }
//         return user.getRole().split(",");
//    }
}
