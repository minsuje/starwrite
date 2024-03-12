package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.PostRepository;
import starwrite.server.response.PostResponse;

@Service
public class PostService {

  private final PostRepository postRepository;
  private final CategoryRepository categoryRepository;

  @Autowired
  public PostService(PostRepository postRepository, CategoryRepository categoryRepository) {
    this.postRepository = postRepository;
    this.categoryRepository = categoryRepository;
  }

  // 모든 글 찾기 ( find All Posts)
//  public List<Post> getAllPosts() {
//    return postRepository.findAllPosts();
//  }

  // 글 작성 ( write Post )
  public Post createPost(Post post) {

    Category foundCategory = categoryRepository.findCategoryById(post.getCategory().getCategoryId());


    Post newPost = new Post();
    newPost.setTitle(post.getTitle());
    newPost.setContent(post.getContent());
    newPost.setVisible(post.getVisible());
    newPost.setState(true);
    newPost.setCreatedAt(LocalDateTime.now());
    newPost.setUpdatedAt(newPost.getCreatedAt());
    newPost.setCategory(foundCategory);


    return postRepository.save(newPost);
  }


  // 글 임시 저장 ( save Posts )
  public Post savePost(Post post){
    Category foundCategory = categoryRepository.findCategoryById(post.getCategory().getCategoryId());

    Post newPost = new Post();
    newPost.setTitle(post.getTitle());
    newPost.setContent(post.getContent());
    newPost.setVisible(post.getVisible());
    newPost.setState(false);
    newPost.setCreatedAt(LocalDateTime.now());
    newPost.setUpdatedAt(newPost.getCreatedAt());
    newPost.setCategory(foundCategory);


    return postRepository.save(newPost);
  }

  // 임시 저장 글 불러오기 ( save Posts Pull )
//  public Post savePostPull(Post post){
//
//  }


  public PostResponse findPost() {
    return postRepository.findPost();
  }


}
