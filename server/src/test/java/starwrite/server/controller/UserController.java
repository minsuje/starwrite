//package starwrite.server.controller;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import starwrite.server.dto.User;
//import starwrite.server.service.UserService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v1/user/")
//public class UserController {
//    private final UserService userService;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("/all")
//    public List<User> getAllUsers(){
//        return userService.getAllUsers();
//    }
//    @GetMapping()
//    public User getUserByHandle(@RequestParam String handle){
//        return userService.getUserByHandle(handle);
//    }
//
//    @PostMapping()
//    public User addUsers(@RequestBody  User user){
//        return userService.addUsers(user);
//    }
//
//    @PostMapping("follow")
//    public  User followUser(@RequestParam String handle){
//        return new User();
//    }
//}
