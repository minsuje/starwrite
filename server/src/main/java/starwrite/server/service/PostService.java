package starwrite.server.service;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.PostRepository;
import starwrite.server.repository.UsersRepository;
import starwrite.server.response.GetPosts;

@Service
public class PostService {

  @Autowired
  PostRepository postRepository;
  @Autowired
  CategoryRepository categoryRepository;
  @Autowired
  UsersRepository usersRepository;


  // 현재 접속한 유저 아이디 ( current user id )
  public String findUserid(String userid){
    return usersRepository.findUserById(userid);
  }

//  // (로그인 유저) 카테고리의 모든 글 조회 ( find All Posts )
//  public GetPosts getAllPost(String userId){
//    return postRepository.findAllPosts(userId);
//  }

  // (유저의) 카테고리의 모든 글 조회
  public GetPosts getCategoryPosts(String nickname, String categoryId){
    return postRepository.findAllPostsByCategory(nickname, categoryId);
  }

  // 공개 글 조회 ( without Pub Posts )
  public GetPosts getPubPost(String userId){
    return postRepository.findPubPosts(userId);
  }

  // (해당 유저) 모든 글 조회
  public GetPosts getAllPosts(String nickname){
    return postRepository.findAllPostsByUserNickname(nickname);
  }

  // 상세 글 조회
  public GetPosts getDetailPost(String postId){
    System.out.println(">>>>>>>>>>>>>>");
    LocalDateTime recentView = LocalDateTime.now();
//    postRepository.setRecentView(postId, recentView);
    System.out.println(">>>>>>>>>>>>>>" +  postRepository.setRecentView(postId, recentView).getClass().getName());
    return postRepository.findOnePost(postId, recentView);
//    System.out.println(recentView);
//    Post foundPost = postRepository.findPostByPostId(postId);
//    foundPost.setRecentView(recentView);
//    postRepository.save(foundPost);
  }

  // 글 작성 ( write Post )
  public Post createPost(Post post) {

    Post newPost = new Post();

    Category foundCategory = categoryRepository.findCategoryById(post.getCategory().getCategoryId());
    System.out.println(foundCategory);
    Users foundUser = usersRepository.findUserByUserId(post.getUsers().getUserId());
    System.out.println(foundUser);

    newPost.setTitle(post.getTitle());
    newPost.setContent(post.getContent());
    newPost.setVisible(post.getVisible());
    newPost.setTmpSave(false);
    newPost.setCreatedAt(LocalDateTime.now());
    newPost.setUpdatedAt(newPost.getCreatedAt());
    newPost.setCategory(foundCategory);
    newPost.setUsers(foundUser);

    // 중요!!
    // 이런 관계가 있다는걸 알려줌
    // 이게 있어야 기존 관계가 지워지지 않음
    foundCategory.setUsers(foundUser);

    return postRepository.save(newPost);
  }


  // 글 임시 저장 ( save Posts )
//  public Post savePost(Post post){
//    Category foundCategory = categoryRepository.findCategoryById(post.getCategory().getCategoryId());
//    Users foundUser = usersRepository.findUserByUser(post.getUser().getUserId());
//
//    Post newPost = new Post();
//    newPost.setTitle(post.getTitle());
//    newPost.setContent(post.getContent());
//    newPost.setVisible(post.getVisible());
//    newPost.setTmpSave(true);
//    newPost.setCreatedAt(LocalDateTime.now());
//    newPost.setUpdatedAt(newPost.getCreatedAt());
//    newPost.setCategory(foundCategory);
//    newPost.setUser(foundUser);
//
//    return postRepository.save(newPost);
//  }

  // 임시 저장 글 불러오기 ( save Posts Pull )
//  public Post savePostPull(Post post){
//
//  }


}
