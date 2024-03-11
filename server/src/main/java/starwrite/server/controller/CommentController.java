package starwrite.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.entity.Comment;
import starwrite.server.service.CommentService;

@RestController
@RequestMapping("comment")
public class CommentController {
  private final CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping
  public Comment createPostComment(@RequestBody Comment comment) {
    System.out.println("comment controller comment >>>>>>>>>" + comment);
    return commentService.createPostComment(comment);
  }
}
