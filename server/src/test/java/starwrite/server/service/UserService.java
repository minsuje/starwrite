package starwrite.server.service;

import org.springframework.stereotype.Service;
import starwrite.server.dto.User;
import starwrite.server.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserByHandle(String handle){
        return userRepository.getUserByHandle(handle);
    }
    public User addUsers(User user){
        return userRepository.save(user);
    }
}
