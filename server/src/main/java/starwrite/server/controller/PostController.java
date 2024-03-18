package starwrite.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.entity.Post;
import starwrite.server.repository.UsersRepository;
import starwrite.server.response.CreatePost;
import starwrite.server.response.CreatedPost;
import starwrite.server.response.BackLink;
import starwrite.server.response.GetPosts;
import starwrite.server.service.PostService;

@RestController
@RequestMapping("user/post")
public class PostController {

  private final PostService postService;

  @Autowired
  public PostController(PostService postService) {
    this.postService = postService;
  }

  @Autowired
  UsersRepository usersRepository;

  // 글 작성 BackLink info 전달
  @GetMapping("/write")
  public List<BackLink> getIdAndTitle(){
    // 임시
    String userId = "ca04fd1f-3f4b-4c94-929d-c39efac871a4";
    return postService.backLink(userId);
  }

  // 유저의 모든 글 조회 (리스트 뷰)
  @GetMapping("/{nickname}/All")
  public GetPosts getAllPosts(@PathVariable(value = "nickname") String nickname) {
    return postService.getAllPosts(nickname);
  }

  // 글 수정


  // (유저의) 카테고리의 모든 포스트 조회 (All Post Get)
 /* @GetMapping("/{nickname}/{categoryId}")
  public GetPosts getAllPosts(@PathVariable(value = "nickname") String nickname,
      @PathVariable(value = "categoryId") String categoryId) {
    return postService.getCategoryPosts(nickname, categoryId);
  }*/

  // 포스트 상세보기 (최근 본 시점으로 시간 기록)
  @GetMapping("/Detail/{postId}")
  public Post getDetailPost(@PathVariable(value = "postId") String postId){
    return postService.getDetailPost(postId);
  }

  // 임시저장 글 모두 불러오기 ( load  All Save Posts )
  @GetMapping("/{nickname}/All/Save")
  public GetPosts getSavePosts(@PathVariable(value = "nickname") String nickname){
    return postService.getSavePosts(nickname);
  }

  // 임시글 하나 불러오기 ( load One Save Posts )
  @GetMapping("/{nickname}/All/Save/{postId}")
  public Post getSavePost(@PathVariable(value = "nickname") String nickname, @PathVariable(value = "postId") String postId){
    return postService.getSavePost(nickname,postId);
  }


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

  // 새 포스팅
  @PostMapping
  public CreatedPost createPost(@RequestBody CreatePost post) {
    return postService.createPost(post);
  }
  // 포스팅 페이지 임시 저장버튼(임시저장)
  @PostMapping("/Save")
  public CreatedPost savePosts(@RequestBody CreatePost post) {
    return postService.savePost(post);
  }

  // 임시 저장에서 임시 저장버튼 (재 임시저장)
  @PatchMapping("/save/{postId}")
  public String saveAgain(@RequestBody CreatedPost post, @PathVariable(value = "postId") Long postId){
    return postService.saveAgain(post, postId);
  }

  // 임시 저장 페이지에서 포스트 버튼
//  @PatchMapping("/{postId}")
//  public String saveTmpPost(@RequestBody CreatedPost post, @PathVariable(value = "postId") Long postId){
//    return postService.
//  }


  // 새 포스트 만들기 ( create new Post )
//  @PostMapping
//  public Post createPost(@RequestBody PostDTO postDTO) {
//    System.out.println(postDTO);
//    return postService.createPost(postDTO);
//  }

  // 임지 서장 글 만들기 ( Create Save Post )
//  @PostMapping("/Save")
//  public Post savePost(@RequestBody Post post){
//    return postService.savePost(post);
//
//  }


//  @PostMapping("/createRelationship")
////  public void createRelationship(@RequestBody String postId, @RequestBody List<String> relatedPostId) {
//  public void createRelationship(@RequestBody PostRelationDTO postRelationDTO) {
//    postService.createRelationship(postRelationDTO.getPostId(), postRelationDTO.getRelatedPostId());
//  }
//
//
//  @GetMapping("/{postId}/related")
//  public RelatedPosts getRelatedPosts(@PathVariable String postId) {
//    RelatedPosts relatedPosts = postService.getRelatedPosts(postId);
//    return relatedPosts;
//  }
}
