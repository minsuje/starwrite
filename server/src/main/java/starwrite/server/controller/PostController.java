package starwrite.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.entity.Post;
import starwrite.server.repository.UsersRepository;
import starwrite.server.response.GetPosts;
import starwrite.server.service.PostService;

@RestController
@RequestMapping("/user/post")
public class PostController {

  private final PostService postService;

  @Autowired
  public PostController(PostService postService) {
    this.postService = postService;
  }

  @Autowired
  UsersRepository usersRepository;

//  // 내 모든 글 조회
//  @GetMapping
//  // (로그인 유저)카테고리의 속한 포스트 모두 가져오기
//  public GetPosts getPosts(){
//    // 헤더에서 user id 정보를 가져왔다고 가정
//    String userid = "f0bdaf55-34cf-41ca-a248-1a462f5027b7";
//    System.out.println(">>>>>>>> " + postService.findUserid(userid));
//    return postService.getAllPost(userid);
//  }

  // 유저의 모든 글 조회
  @GetMapping("/{nickname}/All")
  public GetPosts getAllPosts(@PathVariable(value = "nickname") String nickname) {
    return postService.getAllPosts(nickname);
  }

  // (유저의) 카테고리의 모든 포스트 조회 (All Post Get)
  @GetMapping("/{nickname}/{categoryId}")
  public GetPosts getAllPosts(@PathVariable(value = "nickname") String nickname,
      @PathVariable(value = "categoryId") String categoryId) {
    return postService.getCategoryPosts(nickname, categoryId);
  }

//  @GetMapping("/{nickname}/{categoryId}/{title}")
//  public GetPosts getDetailPost(@PathVariable(value = "nickname") String nickname,
//      @PathVariable(value = "categoryId") String categoryId, @PathVariable(value = "title") String title) {
//    return postService.
//  }

/*

  // ( 로그인 유저 ) 해당 유저의 모든 글 가져오기
  @GetMapping("/All")
  public Map<String, Object> getAllPostsMine(){
    // 유저 nickname 은 헤더에서 가져올거다.
    String nickname = "minsuop";

    Map<String, Object> result = new HashMap<>();
    result.put("nickname", nickname);
    result.put("posts", postService.getAllPostsMine(nickname));

    return result;

    // 결과
    {
      "nickname": "minsuop",
        "posts": {
      "post": [
      {
        "postId": "c28a7c61-5edf-433a-8494-7e5cfcc36d67",
          "title": "4",
          "content": "4",
          "visible": "pub",
          "img": null,
          "tmpSave": false,
          "createdAt": "2024-03-14T17:03:53.872551",
          "updatedAt": "2024-03-14T17:03:53.872551",
          "category": null,
          "users": null
      }
        ],
      "categoryRelationType": null,
          "usersRelationType": "POSTED"
    }
    }
  }
*/

  @PostMapping
  public Post createPost(@RequestBody Post post) {
    return postService.createPost(post);
  }
}
