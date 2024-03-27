package starwrite.server.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.entity.Post;
import starwrite.server.repository.UsersRepository;
import starwrite.server.request.ScrapPost;
import starwrite.server.response.BackLink;
import starwrite.server.response.CreatePost;
import starwrite.server.response.CreatedPost;
import starwrite.server.response.GetPosts;
import starwrite.server.response.GetSavePost;
import starwrite.server.response.GetScrapPosts;
import starwrite.server.response.PostDetail;
import starwrite.server.response.SearchPosts;
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
  IndexController indexController;

  // 글 작성 BackLink info 전달
  @GetMapping("write")
  public List<BackLink> getIdAndTitle() {
    String userId = SecurityUtil.getCurrentUserUserId();
    return postService.backLink(userId);
  }

//  @GetMapping("writing")
//  public String getI

  // 유저의 모든 글 조회
  @GetMapping("/{nickname}/all")
  public List<GetPosts> getAllPosts(@PathVariable(value = "nickname") String nickname, @RequestParam(value = "skip", defaultValue = "0") int skip,
      @RequestParam(value = "limit", defaultValue = "10") int limit) {
    return postService.getAllPosts(nickname, skip, limit);
  }


  // 유저의 스크랩한 글 조회
  @GetMapping("{nickname}/scrap")
  public List<GetScrapPosts> getScrapPosts(@PathVariable(value = "nickname") String nickname, @RequestParam(value = "skip", defaultValue = "0") int skip,
      @RequestParam(value = "limit", defaultValue = "10") int limit) {
    return postService.getScrapPosts(nickname, skip, limit);
  }



  // 글 수정

  // (유저의) 카테고리의 모든 포스트 조회 (All Post Get)
 /* @GetMapping("/{nickname}/{categoryId}")
  public GetPosts getAllPosts(@PathVariable(value = "nickname") String nickname,
      @PathVariable(value = "categoryId") String categoryId) {
    return postService.getCategoryPosts(nickname, categoryId);
  }*/

  // 포스트 상세보기 (최근 본 시점으로 시간 기록)
//  @GetMapping("/detail/{postId}")
//  public Map<String, Object> getDetailPost(@PathVariable(value = "postId") Long postId) {
//    return postService.getDetailPost(postId);
//  }

  // 글 상세 조회
  @GetMapping("/detail/{postId}")
  public PostDetail getPostDetail(@PathVariable(value = "postId") Long postId) {
    String userId = SecurityUtil.getCurrentUserUserId();
    return postService.getPostDetail(postId, userId);
  }


  // 임시저장 글 모두 불러오기 ( load  All Save Posts )
  @GetMapping("/all/save")
  public List<GetSavePost> getSavePosts() {
    String nickname = SecurityUtil.getCurrentUserNickname();
    return postService.getSavePosts(nickname);
  }

  // 임시글 하나 불러오기 ( load One Save Posts )
  @GetMapping("/all/save/{postId}")
  public GetSavePost getSavePost(@PathVariable(value = "postId") Long postId) {
    String nickname = SecurityUtil.getCurrentUserNickname();
    return postService.getSavePost(nickname, postId);
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
  @PostMapping("/save")
  public CreatedPost savePosts(@RequestBody CreatePost post) {
    return postService.savePost(post);
  }

  // 임시 저장에서 임시 저장버튼 (재 임시저장)
  @PatchMapping("/save/{postId}")
  public String saveAgain(@RequestBody CreatePost post,
      @PathVariable(value = "postId") Long postId) {
    return postService.saveAgain(post, postId);
  }

  //   임시 저장 페이지에서 포스트 버튼
  @PatchMapping("/{postId}")
  public String saveTmpPost(@RequestBody CreatePost post,
      @PathVariable(value = "postId") Long postId) {
    return postService.saveTmpPost(post, postId);
  }

  // 글 삭제
  @DeleteMapping("/delete/{postId}")
  public String deletePost(@PathVariable(value = "postId") Long postId) {
    String userId = SecurityUtil.getCurrentUserUserId();
    return postService.deletePost(postId, userId);
  }

  // 글 스크랩
  @PostMapping("scrap")
  public String scrapPost(@RequestBody ScrapPost scrapPost) {
    return postService.scrapPost(scrapPost);
  }



  // 글 제목 검색
  @GetMapping("/search")
  public List<SearchPosts> searchPosts(@RequestParam(value = "title") String title) {
    return postService.searchPosts(title);
  }

  @GetMapping("recommendation/{postId}")
  public String recommendation(@PathVariable(value = "postId") Long postId){
    String nickname = SecurityUtil.getCurrentUserNickname();

    postService.getPostIdWithChunks(postId, nickname);
    return "성공";
  }

}
