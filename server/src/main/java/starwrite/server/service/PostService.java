package starwrite.server.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.entity.Post;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.PostRepository;
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
import starwrite.server.utils.JsonData;
import starwrite.server.utils.WebClientRecommendGet;
import starwrite.server.utils.WebClientServiceImpl;

@EnableAsync
@Service
@Slf4j
public class PostService {

  @Autowired
  PostRepository postRepository;
  @Autowired
  CategoryRepository categoryRepository;
  @Autowired
  UsersRepository usersRepository;
//  @Autowired
//  VectorStore vectorStore;

//  @Autowired
//  PythonApi pythonApi;


  @Autowired
  private BackgroundTaskService backgroundTaskService;

  @Autowired
  WebClientServiceImpl webClientService;

  @Autowired
  WebClientRecommendGet webClientRecommendGet;




//  public PostService(VectorStore vectorStore) {
//    this.vectorStore = vectorStore;
//  }


  // BackLink Info (postId , title)
  public List<BackLink> backLink(String userId) {
    return postRepository.backLink(userId);
  }

  // (유저의) 카테고리의 모든 글 조회
  /*public GetPosts getCategoryPosts(String nickname, String categoryId){
    return postRepository.findAllPostsByCategory(nickname, categoryId);
  }*/

  // 공개 글 조회 ( without Pub Posts )
  public GetPosts getPubPost(String userId) {
    return postRepository.findPubPosts(userId);
  }

  // (해당 유저) 모든 글 조회
  public List<GetPosts> getAllPosts(String nickname, int skip, int limit) {
    return postRepository.findAllPostsByUserNickname(nickname, skip, limit);
  }

  // 해당 유저의 스크랩한 글 조회
  public List<GetScrapPosts> getScrapPosts(String nickname ,int skip, int limit) {
    String userId = SecurityUtil.getCurrentUserUserId();
    postRepository.getPostDetail(1L, userId);
    return postRepository.findScrapPosts(nickname, skip, limit);
  }


  // 상세 글 조회
  public Map<String, Object> getDetailPost(Long postId) {
    LocalDateTime recentView = LocalDateTime.now();
    String userId = SecurityUtil.getCurrentUserUserId();
    String postUserId = postRepository.findUserIdByPostId(postId);
    System.out.println("상대 아이디 >>>>> " + postUserId);
    System.out.println("내 아이디 >>>> " + userId);
    Map<String, Object> result = new HashMap<>();
    if (!postUserId.equals(userId)) {
      result.put("isMine", false);
      result.put("post", postRepository.otherUserPost(postId));
      return result;
    }
    result.put("isMine", true);
    result.put("post", postRepository.setRecentView(postId, recentView));
    return result;
  }

  // 글 상세 조회
  public PostDetail getPostDetail(Long postId, String userId) {
    return postRepository.getPostDetail(postId, userId);
  }


  // 글 작성 ( write Post )
  public CreatedPost createPost(CreatePost post) {
    /*Post newPost = new Post();

    Category foundCategory = categoryRepository.findCategoryById(post.getPost().getCategory().getCategoryId());
    System.out.println(foundCategory);
    Users foundUser = usersRepository.findUserByUserId(post.getPost().getUsers().getUserId());
    System.out.println(foundUser);

    newPost.setTitle(post.getPost().getTitle());
    newPost.setContent(post.getPost().getContent());
    newPost.setVisible(post.getPost().getVisible());
    newPost.setTmpSave(false);
    newPost.setCreatedAt(LocalDateTime.now());
    newPost.setUpdatedAt(newPost.getCreatedAt());
    newPost.setCategory(foundCategory);
    newPost.setUsers(foundUser);

    // 중요!!
    // 이런 관계가 있다는걸 알려줌
    // 이게 있어야 기존 관계가 지워지지 않음
    foundCategory.setUsers(foundUser);
    postRepository.save(newPost);*/





    Post newPost = post.getPost();

    LocalDateTime timeNow = LocalDateTime.now();

    String img = newPost.getImg() != null ? newPost.getImg() : "";

    List<Long> newRelated = new ArrayList<>();

    if (!post.getRelatedPosts().isEmpty()) {
      List<String> related = post.getRelatedPosts();
      related.forEach(item -> newRelated.add(Long.parseLong(item)));
    }


    String extractedText = "";

    try {
      extractedText = JsonData.parseJson(post.getPost().getContent());
    } catch (IOException e) {
      log.error("Error parsing JSON content", e);
      // 필요한 경우 추가적인 예외 처리
    }

    String userId = SecurityUtil.getCurrentUserUserId();
//    System.out.println("userID >>>>" + userId);
    CreatedPost createdPost = postRepository.createPostLink(userId, post.getCategory(),
        newPost.getTitle(), newPost.getContent(), extractedText,
        newPost.getVisible(), img, timeNow, false,
        newRelated);

//    System.out.println("createdPost >>>>>>>>>" + createdPost);

//    parsePostInBackground(createdPost.getIdentifier(), createdPost.getPost().getContent());

    backgroundTaskService.parsePostBackground(createdPost.getIdentifier(), newPost.getTitle(), newPost.getContent());


    System.out.println("service 리턴함? ");

    return createdPost;
//    postRepository.save(createdPost);

  }

//  @Async
//  public void parsePostInBackground(Long postId, String content) {
//    pythonApi.parsePost(postId, content);
//  }


  // 글 생성페이지 임시저장버튼
  public CreatedPost savePost(CreatePost post) {
    Post newPost = post.getPost();
    LocalDateTime timeNow = LocalDateTime.now();
    String img = newPost.getImg() != null ? newPost.getImg() : "";
    List<Long> newRelated = new ArrayList<>();

    if (!post.getRelatedPosts().isEmpty()) {
      List<String> related = post.getRelatedPosts();
      related.forEach(item -> newRelated.add(Long.parseLong(item)));
    }

    String userId = SecurityUtil.getCurrentUserUserId();
    CreatedPost savePost = postRepository.savePostLink(userId, post.getCategory(),
        newPost.getTitle(), newPost.getContent(), newPost.getVisible(), img, timeNow, true,
        newRelated);
    return savePost;
  }

  // 임시저장 페이지에서 임시저장
  public String saveAgain(CreatePost post, Long postId) {
    LocalDateTime timeNow = LocalDateTime.now();
    Post newPost = post.getPost();
    String img = newPost.getImg() != null ? newPost.getImg() : "";
    // 헤더에서 로그인 아이디 가져옴
    String userId = SecurityUtil.getCurrentUserUserId();
    postRepository.saveAgain(postId, userId, newPost.getTitle(), img, timeNow, newPost.getContent(),
        newPost.getVisible());
    if (postRepository.saveAgain(postId, userId, newPost.getTitle(), img, timeNow,
        newPost.getContent(), newPost.getVisible()) != null) {
      return "success";
    } else {
      return "fail";
    }
  }

  // 임시저장에서 포스트 생성
  public String saveTmpPost(CreatePost post, Long postId) {
    String img = post.getPost().getImg() != null ? post.getPost().getImg() : "";
    String newTitle = post.getPost().getTitle();
    String newVisible = post.getPost().getVisible();
    String categoryId = post.getCategory();
    String newContent = post.getPost().getContent();

    List<Long> rel = new ArrayList<>();

//    // 백링크 글이 있으면
//    if (!post.getRelatedPosts().isEmpty()) {
//      List<String> related = post.getRelatedPosts();
//      related.forEach(item -> rel.add(Long.parseLong(item)));
//    }

    // 이미 청크가 있으면 청크 날리기
//    int result;
    CreatedPost result;
    if (!post.getRelatedPosts().isEmpty()) {
      // 관련 글이 있는 경우
        result = postRepository.updatePost(postId, newTitle, img, newContent, rel, newVisible,
            categoryId);
        Post updatedPost = result.getPost();
        backgroundTaskService.parsePostBackground(result.getIdentifier(), updatedPost.getTitle(), updatedPost.getContent());
    } else {
      // 관련 글이 없는 경우
      result = postRepository.updatePostNull(postId, newTitle, img, newContent, newVisible,
          categoryId);
      Post updatedPost = result.getPost();
      backgroundTaskService.parsePostBackground(result.getIdentifier(), updatedPost.getTitle(), updatedPost.getContent());
    }
    if (result == null) {
      return "edit failed";
    }
    return "success";
  }


  // 임시 저장 글 모두 불러오기 ( load All Save Posts )
  public List<GetSavePost> getSavePosts(String nickname) {
    return postRepository.findAllSavePosts(nickname);
  }

  // 임시 저장 하나 불러오기 ( Load One Save Post)
  public GetSavePost getSavePost(String nickname, Long postId) {
    return postRepository.findSavePost(nickname, postId);
  }

  // 글 삭제
  public String deletePost(Long postId, String userId) {
    postRepository.deletePostByPostId(postId, userId);
    return "삭제 성공";
  }


  // 글 스크랩
  public String scrapPost(ScrapPost scrapPost) {
    String userId = SecurityUtil.getCurrentUserUserId();
    System.out.println("userId >>>>> " + userId);
    int result = postRepository.scrapPost(scrapPost.getPostId(), userId, scrapPost.getCategory());
    if (result == 0) {
      return "post already scraped";
    }
    return "post scraped";
  }


  // 글 검색
  public List<SearchPosts> searchPosts(String title) {
    System.out.println("title >>>>> " + title);
    return postRepository.searchPosts(title);
  }


  public void getPostIdWithChunks(Long postId, String nickname, String userId, String categoryId){

//    System.out.println(">>>>> " + webClientService.postIdWithNickname(postId, nickname, userId, categoryId));
  }

}
