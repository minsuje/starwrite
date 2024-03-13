package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.dto.PostRelationDTO;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.PostRepository;
import starwrite.server.repository.UsersRepository;

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
  public List<Post> getAllPost(String userId){
    return postRepository.findAllPosts(userId);
  }

  // 공개 글 조회 ( without Pub Posts )
  public List<Post> getPubPost(String userId){
    return postRepository.findPubPosts(userId);
  }

  // 글 관계 리턴
  public List<PostRelationDTO> findRelation(String userId){
    return postRepository.findRelation(userId);
  }

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


    return postRepository.save(newPost);
  }


  // 글 임시 저장 ( save Posts )
  public Post savePost(Post post){
    Category foundCategory = categoryRepository.findCategoryById(post.getCategory().getCategoryId());
    Users foundUser = usersRepository.findUserByUser(post.getUsers().getUserId());

    Post newPost = new Post();
    newPost.setTitle(post.getTitle());
    newPost.setContent(post.getContent());
    newPost.setVisible(post.getVisible());
    newPost.setTmpSave(true);
    newPost.setCreatedAt(LocalDateTime.now());
    newPost.setUpdatedAt(newPost.getCreatedAt());
    newPost.setCategory(foundCategory);
    newPost.setUsers(foundUser);

    return postRepository.save(newPost);
  }

  // 임시 저장 글 불러오기 ( save Posts Pull )
//  public Post savePostPull(Post post){
//
//  }


//  public PostResponse findPost() {
//    return postRepository.findPost();
//  }


}
