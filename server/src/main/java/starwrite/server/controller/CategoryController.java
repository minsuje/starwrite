//package starwrite.server.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import starwrite.server.entity.Category;
//import starwrite.server.service.CategoryService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("category")
//public class CategoryController {
//    private final CategoryService categoryService;
//
//    @Autowired
//    public CategoryController(CategoryService categoryService) {
//        this.categoryService = categoryService;
//    }
//
//    @GetMapping
//    public List<Category> getAllCategories(){
//        return categoryService.getAllCategories();
//    }
//
//    @PostMapping
//    public Category addCategory(@RequestBody Category category){
//        return categoryService.addCategory(category);
//    }
//
//    @PutMapping
//    public Category updateCategory(@RequestBody Category category)  {
//        return categoryService.updateCategory(category);
//    }
//
//    @DeleteMapping("/category/{categoryId}")
//    public void deleteCategory(@PathVariable Long categoryId){
//        categoryService.deleteCategory(categoryId);
//    }
//
//}
