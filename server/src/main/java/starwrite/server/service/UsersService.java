package starwrite.server.service;

import jakarta.transaction.Transactional;
import starwrite.server.dto.JwtDTO;

public interface UsersService {

    @Transactional
    JwtDTO signIn(String mail, String password);
}
