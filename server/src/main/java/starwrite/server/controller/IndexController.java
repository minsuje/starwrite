package starwrite.server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import starwrite.server.repository.UsersRepository;

@Controller
public class IndexController {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping({"", "/"})
    public String index() {
        return "index";
    }

    @GetMapping("/loginForm")
    public String loginForm() {
        return "loginForm";
    }

//    @GetMapping("/registerForm")
//    public String registerForm() {
//        return "registerForm";
//    }
//
//    @PostMapping("/register")
//    public String login(Users user) {
//        user.setRole(Role.USER);
//
//        String rawPassword = user.getPassword();
//        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
//
//        user.setPassword(encPassword);
//
//        usersRepository.save(user);
//
//        return "redirect:/loginForm";
//    }
}
