package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Category;
import starwrite.server.repository.CategoryRepository;

@Service
public class CategoryService {

  @Autowired
  CategoryRepository categoryRepository;

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


  public Category addCategory(Category category) {
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
