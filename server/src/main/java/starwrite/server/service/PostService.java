package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.dto.PostDTO;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;
import starwrite.server.relationship.Related;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.PostRepository;
import starwrite.server.repository.UsersRepository;
import starwrite.server.response.CreatePost;
import starwrite.server.response.CreatedPost;
import starwrite.server.response.BackLink;
import starwrite.server.response.GetPosts;
import starwrite.server.response.RelatedPosts;

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

  // BackLink Info (postId , title)
public List<BackLink> backLink(String userId){
    return postRepository.backLink(userId);
}

  // (유저의) 카테고리의 모든 글 조회
  /*public GetPosts getCategoryPosts(String nickname, String categoryId){
    return postRepository.findAllPostsByCategory(nickname, categoryId);
  }*/

  // 공개 글 조회 ( without Pub Posts )
  public GetPosts getPubPost(String userId){
    return postRepository.findPubPosts(userId);
  }

  // (해당 유저) 모든 글 조회
  public GetPosts getAllPosts(String nickname){
    return postRepository.findAllPostsByUserNickname(nickname);
  }

  // 상세 글 조회
  public Post getDetailPost(String postId){
    LocalDateTime recentView = LocalDateTime.now();
    return postRepository.setRecentView(postId, recentView);
  }

  
  // 글 작성 ( write Post )
  public CreatedPost createPost(CreatePost post) {
    System.out.println(">>>>>>>>>>>>>>>>>>><><><><><><>" + post);

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


    if(!post.getRelatedPosts().isEmpty()) {
      List<String> related = post.getRelatedPosts();
      related.forEach(item -> newRelated.add(Long.parseLong(item)));
    }

    CreatedPost createdPost = postRepository.createPostLink(post.getUserid(), post.getCategory(),
        newPost.getTitle(), newPost.getContent(),
        newPost.getVisible(), img, newPost.isTmpSave(), timeNow, false,
        newRelated);

    System.out.println("createdPost >>>>>>>>>" + createdPost);

    return createdPost;
//    postRepository.save(createdPost);

  }

  // 글 임시 저장 ( save Posts )
  public Post savePost(Post post){
    Category foundCategory = categoryRepository.findCategoryById(post.getCategory().getCategoryId());
    Users foundUser = usersRepository.findUserByUserId(post.getUsers().getUserId());

    Post savePost = new Post();
    savePost.setTitle(post.getTitle());
    savePost.setContent(post.getContent());
    savePost.setVisible(post.getVisible());
    savePost.setTmpSave(true);
    savePost.setCreatedAt(LocalDateTime.now());
    savePost.setUpdatedAt(savePost.getCreatedAt());
    savePost.setRecentView(savePost .getRecentView());
    savePost.setCategory(foundCategory);
    savePost.setUsers(foundUser);

    foundCategory.setUsers(foundUser);

    return postRepository.save(savePost);
  }

  // 임시 저장 글 모두 불러오기 ( load All Save Posts )
  public GetPosts getSavePosts(String nickname){
      return postRepository.findAllSavePosts(nickname);
  }

  // 임시 저장 하나 불러오기 ( Load One Save Post)
  public Post getSavePost(String nickname, String postId){
    return postRepository.findSavePost(nickname, postId);
  }
}
