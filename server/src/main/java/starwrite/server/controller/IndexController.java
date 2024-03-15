package starwrite.server.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.dto.JwtDTO;
import starwrite.server.dto.LogInDTO;
import starwrite.server.service.UsersService;
import starwrite.server.service.UsersServiceImpl;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IndexController {
    private final Logger Logger = LoggerFactory.getLogger(IndexController.class.getName());

    @Autowired
    UsersService usersService;

    @Autowired
    UsersServiceImpl usersServiceimpl;

    @GetMapping("/home")
    public String handleWelcome() {
        return "home";
    }

    @GetMapping("/admin/home")
    public String handleAdminHome() {
        return "home_admin";
    }

    @GetMapping("/user/home")
    public String handleUserHome() {
        return "home_user";
    }

    @GetMapping("/login")
    public String handleLogin() {
        return "custom_login";
    }

    @PostMapping("/log-in")
    public JwtDTO signIn(@RequestBody LogInDTO logInDTO) {
        System.out.println("signin" + logInDTO);
        String username = logInDTO.getMail();
        String password = logInDTO.getPassword();
        JwtDTO jwtDTO = usersServiceimpl.signIn(username, password);
        System.out.println("jwtDTO >>>>>>>>>" + jwtDTO);
        log.info("request username = {}, password = {}", username, password);
        log.info("jwtDTO accessToken = {}, refreshToken = {}", jwtDTO.getAccessToken(), jwtDTO.getRefreshToken());

        return jwtDTO;
    }

    @PostMapping("/test")
    public String test() {
        return "success";
    }
}
