package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.PostRepository;

@Service
public class PostService {

  private final PostRepository postRepository;
  private final CategoryRepository categoryRepository;

  @Autowired
  public PostService(PostRepository postRepository, CategoryRepository categoryRepository) {
    this.postRepository = postRepository;
    this.categoryRepository = categoryRepository;
  }

  public List<Post> getAllPosts() {
    return postRepository.findAllPosts();
  }

  public Post createPost(Post post) {
    Category foundCategory = categoryRepository.findCategoryById(
        post.getCategory().getCategoryId());

//      if (foundCategory.getPostList() == null) {
//        foundCategory.setPostList(new ArrayList<>());
//      }

    Post newPost = new Post();
    newPost.setTitle(post.getTitle());
    newPost.setContent(post.getContent());
    newPost.setCreatedAt(LocalDateTime.now());
    newPost.setUpdatedAt(newPost.getCreatedAt());
    newPost.setCategory(foundCategory);

    foundCategory.setUpdatedAt(LocalDateTime.now());
//      foundCategory.getPostList().add(newPost);
    categoryRepository.save(foundCategory);

    return postRepository.save(newPost);
  }


}
