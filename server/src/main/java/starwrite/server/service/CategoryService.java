package starwrite.server.service;

import java.security.PublicKey;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
import starwrite.server.response.GetCategoryPosts;
import starwrite.server.response.PostResponse;
import starwrite.server.response.RelatedPosts;

@Service
public class CategoryService {

  @Autowired
  CategoryRepository categoryRepository;

  @Autowired
  UsersRepository usersRepository;
  @Autowired
  private PostRepository postRepository;

  public Category getPosts(String id) {
    return categoryRepository.findCategoryById(id);
  }

  public List<Category> getAllCategories() {
    return categoryRepository.getAllCategory();
  }

  public List<GetCategoryPosts> getCategoryPosts(String categoryId, String userId) {

    return categoryRepository.getCategoryPosts(categoryId, userId);
  }


  public PostResponse getCategoryByUserId(String userId) {
    return categoryRepository.findCategoryByUserId(userId);
  };

//  public RelatedPosts getRelatedPosts(String userId, String categoryId) {
//    List<Post> relatedPosts = categoryRepository.getCategoryPostsNode(userId, categoryId);
//    List<String> relatedPostIds = relatedPosts.stream()
//        .map(Post::getPostId)
//        .collect(Collectors.toList());
//
//    return new RelatedPosts(postId, relatedPostIds);
//  }


  public List<GetCategoryPosts> getCategoryPostsNode(String categoryId) {
    return categoryRepository.getCategoryPostsNode(categoryId);
  }

  public Category addCategory(Category category) {

    Category newCategory = new Category();

    Users foundUser = usersRepository.findUserByUserId(category.getUsers().getUserId());

    newCategory.setName(category.getName());
    newCategory.setUsers(foundUser);
    newCategory.setCreatedAt(LocalDateTime.now());
    newCategory.setUpdatedAt(newCategory.getCreatedAt());

    return categoryRepository.save(newCategory);
  }

  public Category updateCategory(Category category) {
    Optional<Category> categoryFromDB = categoryRepository.findById(category.getCategoryId());
    if (categoryFromDB.isPresent()) {
      Category categoryFromDBVal = categoryFromDB.get();
      categoryFromDBVal.setName(category.getName());
      categoryRepository.save(categoryFromDBVal);
    } else {
      return null;
    }
    return category;
  }

  public void deleteCategory(String id) {
    categoryRepository.deleteById(id);
  }

}
