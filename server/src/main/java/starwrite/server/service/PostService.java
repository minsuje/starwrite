package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;
import starwrite.server.relationship.Related;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.PostRepository;
import starwrite.server.repository.UsersRepository;
import starwrite.server.response.CreatePost;
import starwrite.server.response.CreatedPost;
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
  public String findUserid(String userid) {
    return usersRepository.findUserById(userid);
  }

//  // (로그인 유저) 카테고리의 모든 글 조회 ( find All Posts )
//  public GetPosts getAllPost(String userId){
//    return postRepository.findAllPosts(userId);
//  }

  // (유저의) 카테고리의 모든 글 조회
  public GetPosts getCategoryPosts(String nickname, String categoryId) {
    return postRepository.findAllPostsByCategory(nickname, categoryId);
  }

  // 공개 글 조회 ( without Pub Posts )
  public GetPosts getPubPost(String userId) {
    return postRepository.findPubPosts(userId);
  }

  // (해당 유저) 모든 글 조회
  public GetPosts getAllPosts(String nickname) {
    return postRepository.findAllPostsByUserNickname(nickname);
  }

  // 상세 글 조회
  public GetPosts getDetailPost(String postId) {
    System.out.println(">>>>>>>>>>>>>>");
    LocalDateTime recentView = LocalDateTime.now();
//    postRepository.setRecentView(postId, recentView);
    System.out.println(
        ">>>>>>>>>>>>>>" + postRepository.setRecentView(postId, recentView).getClass().getName());
    return postRepository.findOnePost(postId, recentView);
//    System.out.println(recentView);
//    Post foundPost = postRepository.findPostByPostId(postId);
//    foundPost.setRecentView(recentView);
//    postRepository.save(foundPost);
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


    if(!post.getRelatedPosts().isEmpty()) {
      List<String> related = post.getRelatedPosts();
      related.forEach(item -> newRelated.add(Long.parseLong(item)));
    }





    CreatedPost createdPost = postRepository.createPostLink(newPost.getUsers().getUserId(), post.getCategory(),
        newPost.getTitle(), newPost.getContent(),
        newPost.getVisible(), img, newPost.isTmpSave(), timeNow, false,
        newRelated);

    System.out.println("createdPost >>>>>>>>>" + createdPost);

    return createdPost;
//    postRepository.save(createdPost);

  }


  public void createRelationship(String postId, String relatedPostId) {
    /*System.out.println("createRelationship postId" + postId);
    System.out.println("createRelationship relatedPostId" + relatedPostId);

    Post foundPost = postRepository.findPostById(postId);

    Post foundRelatedPost = postRepository.findPostById(relatedPostId);

    System.out.println("foundPost >>>>>>>>>>>" + foundPost);
    System.out.println("foundRelatedPost >>>>>>>>>>>" + foundRelatedPost);

    Related newRelated = new Related();
    newRelated.setPostId(foundPost.getPostId());
    newRelated.setRelatedPostId(foundRelatedPost.getPostId());
    newRelated.setRelatedPost(foundRelatedPost);
    newRelated.setRelatedBack(false);

    System.out.println("set newRelated");

    foundPost.setRelatedPost(newRelated);

    System.out.println("set newRelated in foundPost >>>>>>>>>" + foundPost);

    postRepository.save(foundPost);*/

    System.out.println(
        "Creating relationship between postId " + postId + " and relatedPostId " + relatedPostId);
    Post updatedPost = postRepository.createAndLinkRelatedPost(postId, relatedPostId);
    System.out.println("Updated Post with new relationship: " + updatedPost);
  }


  public void createRelationship(String postId, List<String> relatedPostIds) {
    postRepository.createMultipleRelationships(postId, relatedPostIds);
  }


  public Post getPostWithRelatedPosts(String postId) {
    return postRepository.findPostWithRelatedPosts(postId);
  }


  public RelatedPosts getRelatedPosts(String postId) {
    List<Post> relatedPosts = postRepository.findRelatedPosts(postId);
    System.out.println(relatedPosts);
    List<String> relatedPostIds = relatedPosts.stream().map(Post::getPostId).toList();

    return new RelatedPosts(postId, relatedPostIds);
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
