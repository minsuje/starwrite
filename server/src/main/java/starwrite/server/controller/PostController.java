package starwrite.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.entity.Post;
import starwrite.server.service.PostService;

@RestController
@RequestMapping("post")
public class PostController {

  private final PostService postService;

  @Autowired
  public PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping
  public List<Post> getAllPosts() {
    return postService.getAllPosts();
  }

  @PostMapping
  public Post createPost(@RequestBody Post post) {
    return postService.createPost(post);
  }
}
