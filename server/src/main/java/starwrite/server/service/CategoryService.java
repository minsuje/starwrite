package starwrite.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Category;
import starwrite.server.entity.Posts;
import starwrite.server.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
   private final CategoryRepository categoryRepository;

   @Autowired
   public CategoryService(CategoryRepository categoryRepository) {
       this.categoryRepository = categoryRepository;
   }


   public List<Posts> getPosts(Long id){
     System.out.println("category getPosts id >>>>>>>> " + id);
     System.out.println("category getPost type id >>>>>>>>>>>>>>>>>>>>" + id.getClass().getTypeName());
     System.out.println("category getposts result >>>>>>> " + categoryRepository.findCategoryById(id));
       return categoryRepository.findCategoryById(id);
   }

   public List<Category> getAllCategories(){
       return categoryRepository.findAll();
   }

   public Category addCategory(Category category){
       return categoryRepository.save(category);
   }

   public Category updateCategory(Category category)  {
       Optional<Category> categoryFromDB=  categoryRepository.findById(category.getCategoryId());
       if(categoryFromDB.isPresent()){
           Category categoryFromDBVal = categoryFromDB.get();
           // categoryFromDBVal.setPosts(category.getBooks());
           categoryFromDBVal.setName(category.getName());
           categoryRepository.save(categoryFromDBVal);
       }else{
           return null;
       }
       return category;
   }

   public void deleteCategory(Long id) {
       categoryRepository.deleteById(id);
   }
}
