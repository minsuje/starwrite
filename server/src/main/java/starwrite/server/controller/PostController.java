package starwrite.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.dto.PostRelationDTO;
import starwrite.server.dto.Result;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;
import starwrite.server.service.PostService;

@RestController
@RequestMapping("post")
public class                                                                                                                                                                     PostController {

  private final PostService postService;

  @Autowired
  public PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping
  public List<Post> getPost(){
    // 헤더에서 user id 정보를 가져왔다고 가정
    String userid = "e8cf94ef-ca9a-460e-8ab4-0cc3ed996c20";
    postService.findUserid(userid);
    System.out.println(">>>>>>>> " + postService.findUserid(userid));
    if(postService.findUserid(userid) != null){
      return postService.getAllPost(userid);
    } else{
      return postService.getPubPost(userid);
    }
  }

  @GetMapping
  public List<Result> getPosts(){
    // 헤더에서 user id 정보를 가져왔다고 가정
    String userid = "e8cf94ef-ca9a-460e-8ab4-0cc3ed996c20";

    postService.findUserid(userid);
    System.out.println(">>>>>>>> " + postService.findUserid(userid));
    if(postService.findUserid(userid) != null){
      List<PostRelationDTO> relation = postService.findRelation(userid);
      List<Post> posts = postService.getAllPost(userid);
      Map<String, Object> responseData = new HashMap<>();
      responseData.put("data1", posts);
      responseData.put("data2", relation);
//      return {"data1" : posts, "data2" : relation};
      return (List<Result>) responseData;
    } else{
      List<PostRelationDTO> relation = postService.findRelation(userid);
      List<Post> posts = postService.getAllPost(userid);
      Map<String, Object> responseData = new HashMap<>();
      responseData.put("data1", posts);
      responseData.put("data2", relation);
      return (List<Result>) responseData;
    }
  }


//
//  @GetMapping
//  public List<Post> getAllPosts() {
//    return postService.getAllPosts();
//  }

  @PostMapping
  public Post createPost(@RequestBody Post post) {
    return postService.createPost(post);
  }


//  @GetMapping("test")
//  public PostResponse findPost() {
//    return postService.findPost();
//  }

  @PostMapping("save")
  public Post savePost(@RequestBody Post post) { return postService.savePost(post);}



}
