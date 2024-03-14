package starwrite.server.controller;

import java.security.PublicKey;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.dto.PostDTO;
import starwrite.server.entity.Post;
import starwrite.server.repository.UsersRepository;
import starwrite.server.response.GetPosts;
import starwrite.server.service.PostService;

@RestController
@RequestMapping("post")
public class                                                                                                                                                                     PostController {

  private final PostService postService;

  @Autowired
  public PostController(PostService postService) {
    this.postService = postService;
  }

  @Autowired
  UsersRepository usersRepository;


  // 내 모든 글 조회
  @GetMapping
  public GetPosts getPosts(){
    // 헤더에서 user id 정보를 가져왔다고 가정
    String userid = "0a24686d-c249-4469-8a61-b2f4a2b33e2c";
    System.out.println(">>>>>>>> " + postService.findUserid(userid));
    return postService.getAllPost(userid);
  }

  // 상대방 특정 카테고리의 모든 포스트 조회 (Other User Post Get)
  @GetMapping("/{userId}/{categoryId}")
  public GetPosts getOtherPosts(@PathVariable(value = "userId") String userId,@PathVariable(value = "categoryId") String categoryId){
    return postService.getOtherUserPosts(userId, categoryId);
  }



  @PostMapping
  public Post createPost(@RequestBody Post post) {
    return postService.createPost(post);
  }

//  @PostMapping("save")
//  public Post savePost(@RequestBody Post post) { return postService.savePost(post);}
}
