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
    System.out.println("cat service foundUser >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + categoryRepository.findCategoryByUserId("d5e14876-d768-4ccd-822c-5e6973513762"));
//    List<PostResponse> postlist = categoryRepository.findCategoryByUserId("0d74dd82-0513-4925-80b9-7c6b4ff9c282");
//    System.out.println("postlist >>>>>>>>>>>>>>>" + postlist.get(0));
    return categoryRepository.findCategoryByUserId("d5e14876-d768-4ccd-822c-5e6973513762");
  };

  public Category addCategory(Category category) {

    Users foundUser = usersRepository.findUserByUserId("d5e14876-d768-4ccd-822c-5e6973513762");
    System.out.println("foundUSer >>>>>>>>>>>>>>>" + foundUser);
    category.setUsers(foundUser);

    category.setCreatedAt(LocalDateTime.now());
    category.setUpdatedAt(category.getCreatedAt());

    return categoryRepository.save(category);
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
