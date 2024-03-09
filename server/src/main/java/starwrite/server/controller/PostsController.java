package starwrite.server.controller;

import java.util.List;

import org.neo4j.cypherdsl.core.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import static org.neo4j.cypherdsl.core.Cypher.*;
import starwrite.server.entity.Posts;
import starwrite.server.service.PostsService;
import org.neo4j.cypherdsl.core.renderer.Renderer;

@RestController
@RequestMapping("posts")
public class PostsController {
    @Autowired
    PostsService postsService;

    @GetMapping("")
    public List<Posts> getAllPosts(){
        return postsService.getAllPosts();
    }


    @PostMapping("")
    @ResponseBody
    public Long createPost(@RequestBody Posts post){
        Long postId = postsService.createPost(post);

//        Parameter categoryIdParam = parameter(String.valueOf(categoryId));
//        Node posts = Cypher.node("Posts").named("p");
//        Node category = Cypher.node("category").named("c").withProperties("id", Cypher.literalOf(categoryId));
//        Statement statement = Cypher.match(category.relationshipTo(posts, "POSTED")).returning(posts).build();
//
//        Renderer rend = Renderer.getDefaultRenderer();
//        statement.getCypher();
        //        assertThat(cypherRenderer.render(statement))
        return postId;

    }

//    @GetMapping("/{categoryId}")
//    public List<Posts> getPosts(@PathVariable String categoryId){
//        System.out.println("postId >>>>>>>>>>>>>>" + categoryId);
//        return postsService.getPosts(categoryId);
//    }
}
