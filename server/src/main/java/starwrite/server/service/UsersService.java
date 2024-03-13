package starwrite.server.service;

import org.springframework.transaction.annotation.Transactional;
import starwrite.server.dto.JwtDTO;

public interface UsersService {

    @Transactional
    JwtDTO signIn(String mail, String password);
}
