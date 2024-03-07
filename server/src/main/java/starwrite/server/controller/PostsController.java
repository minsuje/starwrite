package starwrite.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.entity.Posts;
import starwrite.server.service.PostsService;

import java.util.Objects;

@RestController
@RequestMapping("Posts")
public class PostsController {
    @Autowired
    PostsService postsService;

    @PostMapping("")
    public String createPost(@RequestBody Posts post){
        String msg = postsService.createPost(post);
        return msg;
    }
}
