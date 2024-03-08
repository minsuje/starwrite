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
        Posts newPost = postsRepository.save(post);
        String msg;
        if(newPost != null){
            msg = "success";
        } else{
            msg = "false";
        }
        return msg;
    }




}
