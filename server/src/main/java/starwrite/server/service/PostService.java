package starwrite.server.service;

import java.security.PublicKey;
import java.time.LocalDateTime;
import java.util.List;
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

  // 모든 글 찾기 ( find All Posts)
//  public List<Post> getAllPosts() {
//    return postRepository.findAllPosts();
//  }

  // 현재 접속한 유저 아이디 ( current user id )
  public String findUserid(String users){
    return usersRepository.findUserById(users);
  }

  // 모든 글 조회 ( find All Posts )
  public GetPosts getAllPost(String userId){
    return postRepository.findAllPosts(userId);
  }

  // 상대방 특정 카테고리 모든 글 조회
  public GetPosts getOtherUserPosts(String userId, String categoryId){
    return postRepository.findAllPostsByCategory(userId, categoryId);
  }

  // 공개 글 조회 ( without Pub Posts )
  public GetPosts getPubPost(String userId){
    return postRepository.findPubPosts(userId);
  }

  // 글 관계 리턴

  // 글 작성 ( write Post )
  public Post createPost(Post post) {

    Category foundCategory = categoryRepository.findCategoryById(post.getCategory().getCategoryId());
    System.out.println(foundCategory);
    Users foundUser = usersRepository.findUserByUser(post.getUsers().getUserId());
    System.out.println(foundUser);

    Post newPost = new Post();
    newPost.setTitle(post.getTitle());
    newPost.setContent(post.getContent());
    newPost.setVisible(post.getVisible());
    newPost.setTmpSave(false);
    newPost.setCreatedAt(LocalDateTime.now());
    newPost.setUpdatedAt(newPost.getCreatedAt());
    newPost.setCategory(foundCategory);
    newPost.setUsers(foundUser);


//    return postRepository.save(newPost);
    return postRepository.createPost(newPost.getTitle(), newPost.getContent(), newPost.getVisible(),
        newPost.isTmpSave(), foundUser.getUserId(), foundCategory.getCategoryId());
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


//  public PostResponse findPost() {
//    return postRepository.findPost();
//  }


}
