package starwrite.server.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Category;
import starwrite.server.entity.Posts;
import starwrite.server.repository.PostsRepository;

@Service
public class PostsService {
    private final PostsRepository postsRepository;

    @Autowired
    public PostsService(PostsRepository postsRepository) {this.postsRepository = postsRepository;}

    public List<Posts> getAllPosts() {
        return postsRepository.findAll();

    }
    public String createPost(Posts post){
        System.out.println("post >>>>>>> " + post);
        Posts newPost = postsRepository.save(post);
        String msg;
        if(newPost != null){
            msg = "success";
        } else{
            msg = "false";
        }
        return msg;
    }

    public List<Posts> getPosts(Long categoryId) {
        System.out.println("service post id>>>>>>>>>>>>> " + categoryId);
        return postsRepository.findPostsById(categoryId);
    }


}
