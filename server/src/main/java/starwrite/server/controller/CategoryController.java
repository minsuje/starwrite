package starwrite.server.controller;

import java.util.Collection;
import java.util.Map;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import starwrite.server.dto.UserDTO;
import starwrite.server.entity.Category;
import starwrite.server.entity.Users;
import starwrite.server.relationship.Owns;
import starwrite.server.relationship.Related;
import starwrite.server.response.GetCategoryPosts;
import starwrite.server.response.PostResponse;
import starwrite.server.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("category")
public class CategoryController {

  private final CategoryService categoryService;

  @Autowired
  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @GetMapping
  public List<Category> getAllCategories() {
    return categoryService.getAllCategories();
  }


  @GetMapping("/getCategoryPosts")
  public List<GetCategoryPosts> getCategoryPosts(@RequestParam(value = "categoryId") String categoryId,
      @RequestParam(value = "userId") String userId) {
    return categoryService.getCategoryPosts(categoryId, userId);
  }

  @GetMapping("/getCategoryPostNode")
  public List<GetCategoryPosts> getCategoryPostNode(@RequestBody Category category) {
    return categoryService.getCategoryPostsNode(category.getCategoryId());
  }



  @GetMapping("/test/{userId}")
  public PostResponse getCategoryByUserId(@PathVariable(value = "userId") String userId) {
    return categoryService.getCategoryByUserId(userId);
  }

  @PostMapping
  public Category addCategory(@RequestBody Category category) {
    return categoryService.addCategory(category);
  }


  @PutMapping
  public Category updateCategory(@RequestBody Category category) {
    return categoryService.updateCategory(category);
  }

  @DeleteMapping("/category/{categoryId}")
  public void deleteCategory(@PathVariable String categoryId) {
    categoryService.deleteCategory(categoryId);
  }

}
