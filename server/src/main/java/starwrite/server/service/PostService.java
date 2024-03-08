package starwrite.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Post;
import starwrite.server.repository.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    public Post addPost(Post post){
        return postRepository.save(post);
    }

    public Post updatePost(Post post)  {
        Optional<Post> postFromDB=  postRepository.findById(post.getId());
        if(postFromDB.isPresent()){
            Post postFromDBVal = postFromDB.get();
            // postFromDBVal.setPosts(post.getBooks());
            // postFromDBVal.setName(post.getName());
            postRepository.save(postFromDBVal);
        }else{
            return null;
        }
        return post;
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
