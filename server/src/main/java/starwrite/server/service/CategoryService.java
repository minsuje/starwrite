package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Category;
import starwrite.server.entity.Users;
import starwrite.server.repository.CategoryRepository;
import starwrite.server.repository.UsersRepository;
import starwrite.server.response.GetCategoryPosts;
import starwrite.server.response.PostResponse;

@Service
public class CategoryService {

  @Autowired
  CategoryRepository categoryRepository;

  @Autowired
  UsersRepository usersRepository;

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
