package starwrite.server.controller;

import java.util.List;

import org.neo4j.cypherdsl.core.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import static org.neo4j.cypherdsl.core.Cypher.*;
import starwrite.server.entity.Posts;
import starwrite.server.service.PostsService;
import org.neo4j.cypherdsl.core.renderer.Renderer;

import java.util.Objects;

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
    public Long createPost(@RequestBody Posts post, @RequestParam(value = "categoryId", required = false) Long categoryId){
        Long postid = postsService.createPost(post);
        Posts relationship = postsService.relation(categoryId, postid);

//        Parameter categoryIdParam = parameter(String.valueOf(categoryId));
//        Node posts = Cypher.node("Posts").named("p");
//        Node category = Cypher.node("category").named("c").withProperties("id", Cypher.literalOf(categoryId));
//        Statement statement = Cypher.match(category.relationshipTo(posts, "POSTED")).returning(posts).build();
//
//        Renderer rend = Renderer.getDefaultRenderer();
//        statement.getCypher();
        //        assertThat(cypherRenderer.render(statement))
        return postid;
    }
}
