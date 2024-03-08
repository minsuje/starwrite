package starwrite.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Posts;
import starwrite.server.service.PostsService;

import java.util.Objects;

@RestController
@RequestMapping("posts")
public class PostsController {
    @Autowired
    PostsService postsService;

    @GetMapping
    public List<Posts> getAllPosts(){
        return postsService.getAllPosts();
    }



    @PostMapping("")
    public String createPost(@RequestBody Posts post){
        String msg = postsService.createPost(post);
        return msg;
    }
}
