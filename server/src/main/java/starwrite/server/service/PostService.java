package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.entity.Post;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.PostRepository;
import starwrite.server.repository.UsersRepository;
import starwrite.server.response.BackLink;
import starwrite.server.response.CreatePost;
import starwrite.server.response.CreatedPost;
import starwrite.server.response.GetPosts;
import starwrite.server.response.PostDetail;

@Service
public class PostService {

  @Autowired
  PostRepository postRepository;
  @Autowired
  CategoryRepository categoryRepository;
  @Autowired
  UsersRepository usersRepository;


  // 현재 접속한 유저 아이디 ( current user id )
  public String findUserid(String userid) {
    return usersRepository.findUserById(userid);
  }

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

  // 상세 글 조회
  public Map<String, Object> getDetailPost(Long postId) {
    LocalDateTime recentView = LocalDateTime.now();
    String userId = SecurityUtil.getCurrentUserUserId();
    String postUserId = postRepository.findUserIdByPostId(postId);
    System.out.println("상대 아이디 >>>>> "  + postUserId);
    System.out.println("내 아이디 >>>> " + userId);
    Map<String, Object> result = new HashMap<>();
    if(!postUserId.equals(userId)){
      System.out.println(">>>>>>>>>>> 상대가 본글 볼거야");
      result.put("isMine", false);
      result.put("post", postRepository.otherUserPost(postId));
      return result;
    }
    System.out.println("내가 쓴글 볼거야 <<<<<<<<<<<");
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

    String userId = SecurityUtil.getCurrentUserUserId();
    System.out.println("userID >>>>" + userId);
    CreatedPost createdPost = postRepository.createPostLink(userId, post.getCategory(),
        newPost.getTitle(), newPost.getContent(),
        newPost.getVisible(), img, timeNow, false,
        newRelated);

    System.out.println("createdPost >>>>>>>>>" + createdPost);

    return createdPost;
//    postRepository.save(createdPost);

  }

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
  public String saveAgain(CreatePost post, Long postId){
    LocalDateTime timeNow = LocalDateTime.now();
    Post newPost = post.getPost();
    String img = newPost.getImg() != null ? newPost.getImg() : "";
    // 헤더에서 로그인 아이디 가져옴
    String userId = SecurityUtil.getCurrentUserUserId();
    postRepository.saveAgain(postId ,userId, newPost.getTitle(), img, timeNow ,newPost.getContent(), newPost.getVisible());
    if(postRepository.saveAgain(postId ,userId, newPost.getTitle(), img, timeNow ,newPost.getContent(), newPost.getVisible()) != null){
      return "success";
    } else {
      return "fail";
    }
  }

  // 임시저장에서 포스트 생성
  public String saveTmpPost(CreatePost post, Long postId, String userId){
    LocalDateTime newTime = LocalDateTime.now();
    String img = post.getPost().getImg() != null ? post.getPost().getImg() : "";
    String newTitle = post.getPost().getTitle();
    String newVisible = post.getPost().getVisible();
    String categoryId = post.getCategory();
    String newContent = post.getPost().getContent();

    List<Long> rel = new ArrayList<>();

    if(!post.getRelatedPosts().isEmpty()){
      List<String> related = post.getRelatedPosts();
      related.forEach(item -> rel.add(Long.parseLong(item)));
    }
    System.out.println("Rel >>> " + rel);

    postRepository.saveTmpPost(postId, userId, img, newContent, newTitle, newTime, rel, newVisible, categoryId);
    System.out.println(postRepository.saveTmpPost(postId, userId, img, newContent, newTitle, newTime, rel, newVisible, categoryId));
    if(postRepository.saveTmpPost(postId, userId, img, newContent, newTitle, newTime, rel, newVisible, categoryId) != null){
      return "Success";
    }
    return "fail";
  }


  // 임시 저장 글 모두 불러오기 ( load All Save Posts )
  public GetPosts getSavePosts(String nickname) {
    return postRepository.findAllSavePosts(nickname);
  }

  // 임시 저장 하나 불러오기 ( Load One Save Post)
  public Post getSavePost(String nickname, Long postId) {
    return postRepository.findSavePost(nickname, postId);
  }

  // 글 삭제
  public String deletePost(Long postId, String userId){
    postRepository.deletePostByPostId(postId, userId);
    return "삭제 성공";
  }
}
