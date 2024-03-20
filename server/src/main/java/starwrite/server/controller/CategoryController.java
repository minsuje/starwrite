package starwrite.server.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.entity.Category;
import starwrite.server.entity.Post;
import starwrite.server.response.CategoryDetailResponse;
import starwrite.server.response.CategoryPosts;
import starwrite.server.response.GetCategoryPosts;
import starwrite.server.response.UserCategories;
import starwrite.server.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("user/category")
public class CategoryController {

  private final CategoryService categoryService;

  @Autowired
  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @Autowired
  private HttpServletResponse response;


  // 카테고리 생성
  @PostMapping
  public Category addCategory(@RequestBody Category category) {
    return categoryService.addCategory(category);
  }


  // 카테고리 수정
  @PatchMapping
  public String updateCategory(@RequestBody Category category) {
    System.out.println("category >>>>>>>>>>> " + category);
    return categoryService.updateCategory(category);
  }


  // 카테고리 삭제
  @DeleteMapping
  public String deleteCategory(@RequestParam(value = "categoryId") String categoryId) {
    return categoryService.deleteCategory(categoryId);
  }


  // 카테고리 안의 모든 글 불러오기
  @GetMapping("/posts")
  public List<CategoryPosts> getCategoryPosts(@RequestParam(value = "categoryId") String categoryId) {

    Cookie cookie = new Cookie("nickName", SecurityUtil.getCurrentUserNickname());
    cookie.setMaxAge(60 * 60 * 24 * 7);  // 쿠키 유효 시간 : 1주일
    response.addCookie(cookie);

    return categoryService.getCategoryPosts(categoryId);
  }


  // 유저 닉네임에 해당하는 카테고리 가져오기
  @GetMapping("/user")
  public List<UserCategories> getUserCategory(@RequestParam(value = "nickname") String nickname) {
    return categoryService.getUserCategory(nickname);
  }


  // 특정 카테고리의 노드 뷰 글, 관계 가져오기
  @GetMapping("/getCategoryPostNode")
  public GetCategoryPosts getCategoryPostNode(@RequestParam(value = "categoryId") String category) {
    System.out.println("category >>>>>>>>>>>>> " + category);
    return categoryService.getCategoryPostsNode(category);
  }




//  @GetMappings
//  public List<Category> getAllCategories() {
//    return categoryService.getAllCategories();
//  }

//  @GetMapping("/test/{userId}")
//  public PostResponse getCategoryByUserId(@PathVariable(value = "userId") String userId) {
//    return categoryService.getCategoryByUserId(userId);
//  }

//  @PutMapping
//  public Category updateCategory(@RequestBody Category category) {
//    return categoryService.updateCategory(category);
//  }
//
//  @DeleteMapping("/category/{categoryId}")
//  public void deleteCategory(@PathVariable String categoryId) {
//    categoryService.deleteCategory(categoryId);
}

