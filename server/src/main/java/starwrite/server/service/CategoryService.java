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
import starwrite.server.response.PostResponse;

@Service
public class CategoryService {

  @Autowired
  CategoryRepository categoryRepository;

  @Autowired
  UsersRepository usersRepository;

//  private final CategoryRepository categoryRepository;
//
//  @Autowired
//  public CategoryService(CategoryRepository categoryRepository) {
//    this.categoryRepository = categoryRepository;
//  }


  public Category getPosts(String id) {
    System.out.println("category getPosts id >>>>>>>> " + id);
    System.out.println(
        "category getPost type id >>>>>>>>>>>>>>>>>>>>" + id.getClass().getTypeName());
    System.out.println(
        "category getposts result >>>>>>> " + categoryRepository.findCategoryById(id));
    return categoryRepository.findCategoryById(id);
  }

  public List<Category> getAllCategories() {
    return categoryRepository.getAllCategory();
  }


  public PostResponse getCategoryByUserId(String userId) {
    System.out.println("cat service >>>>>>>>> userid >>>>>>>>" + userId);
    System.out.println("cat service foundUser >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + categoryRepository.findCategoryByUserId(userId));
//    List<PostResponse> postlist = categoryRepository.findCategoryByUserId("0d74dd82-0513-4925-80b9-7c6b4ff9c282");
//    System.out.println("postlist >>>>>>>>>>>>>>>" + postlist.get(0));
    return categoryRepository.findCategoryByUserId(userId);
  };

  public Category addCategory(Category category) {

    Category newCategory = new Category();

    Users foundUser = usersRepository.findUserByUserId(category.getUsers().getUserId());
    System.out.println("foundUSer >>>>>>>>>>>>>>>" + foundUser);

    newCategory.setName(category.getName());
    newCategory.setUsers(foundUser);
    newCategory.setCreatedAt(LocalDateTime.now());
    newCategory.setUpdatedAt(newCategory.getCreatedAt());

//    category.setUsers(foundUser);
//    category.setCreatedAt(LocalDateTime.now());
//    category.setUpdatedAt(category.getCreatedAt());
    System.out.println("newCategory >>>>>>>>>" +newCategory);

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
