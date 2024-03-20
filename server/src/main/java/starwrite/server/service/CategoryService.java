package starwrite.server.service;

import java.security.PublicKey;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;
import starwrite.server.relationship.Related;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.PostRepository;
import starwrite.server.repository.UsersRepository;
import starwrite.server.response.CategoryDetailResponse;
import starwrite.server.response.CategoryPosts;
import starwrite.server.response.GetCategoryPosts;
import starwrite.server.response.PostResponse;
import starwrite.server.response.RelatedPosts;
import starwrite.server.response.UserCategories;

@Service
public class CategoryService {

  @Autowired
  CategoryRepository categoryRepository;

  @Autowired
  UsersRepository usersRepository;
  @Autowired
  private PostRepository postRepository;




  // 카테고리 안의 모든 글 불러오기
  public List<CategoryPosts> getCategoryPosts(String categoryId) {
    return categoryRepository.getCategoryPosts(categoryId);
  }


  // 특정 유저에 해당하는 카테고리 찾아오기
  public List<UserCategories> getUserCategory(String nickname) {
    return categoryRepository.getUserCategory(nickname);
  }



  // 특정 카테고리의 노드 뷰 글, 관계 가져오기
  public GetCategoryPosts getCategoryPostsNode(String categoryId) {
    return categoryRepository.getCategoryPostsNode(categoryId);
  }


  // 카테고리 생성
  public Category addCategory(Category category) {

    String userId = SecurityUtil.getCurrentUserUserId();

    Category newCategory = new Category();

    Users foundUser = usersRepository.findUserByUserId(userId);

    newCategory.setName(category.getName());
    newCategory.setUsers(foundUser);
    newCategory.setCreatedAt(LocalDateTime.now());
    newCategory.setUpdatedAt(newCategory.getCreatedAt());

    return categoryRepository.save(newCategory);
  }


  // 카테고리 수정
  public String updateCategory(Category category) {
    categoryRepository.updateCategory(category.getCategoryId(), category.getName());
    return "updated";
  }



  // 카테고리 삭제
  public String deleteCategory(String categoryId) {
    categoryRepository.deleteCategory(categoryId);
    return "deleted";
  }



  //  public Category getPosts(String id) {
//    return categoryRepository.findCategoryById(id);
//  }

//  public List<Category> getAllCategories() {
//    return categoryRepository.getAllCategory();
//  }



//  public List<Category> getCategoryById(String categoryId) {
//    return categoryRepository.findCategoryById(categoryId);
//  }



  ;

//  public RelatedPosts getRelatedPosts(String userId, String categoryId) {
//    List<Post> relatedPosts = categoryRepository.getCategoryPostsNode(userId, categoryId);
//    List<String> relatedPostIds = relatedPosts.stream()
//        .map(Post::getPostId)
//        .collect(Collectors.toList());
//
//    return new RelatedPosts(postId, relatedPostIds);
//  }




//  public Category updateCategory(Category category) {
//    Optional<Category> categoryFromDB = categoryRepository.findById(category.getCategoryId());
//    if (categoryFromDB.isPresent()) {
//      Category categoryFromDBVal = categoryFromDB.get();
//      categoryFromDBVal.setName(category.getName());
//      categoryRepository.save(categoryFromDBVal);
//    } else {
//      return null;
//    }
//    return category;
//  }

//  public void deleteCategory(String id) {
//    categoryRepository.deleteById(id);
//  }

}
