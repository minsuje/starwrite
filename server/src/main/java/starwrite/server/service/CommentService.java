package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Comment;
import starwrite.server.entity.Post;
import starwrite.server.repository.CommentRepository;
import starwrite.server.repository.PostRepository;

@Service
public class CommentService {
  private final CommentRepository commentRepository;

  private final PostRepository postRepository;

  @Autowired
  public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
  }

  public List<Comment> getCommentsByPostId() {
    return commentRepository.findAll();
  }

  public Comment createPostComment(Comment comment) {
    System.out.println("comment postid >>>>>>>>>>>>>>>>>>>>>>>>>" + comment.getPost());
    Post foundPost = postRepository.findPostById(comment.getPost().getPostId());
    System.out.println("foundPost >>>>>>>>>>" + foundPost);

    Comment newComment = new Comment();
    newComment.setContent(comment.getContent());
    newComment.setUser(comment.getUser());
    newComment.setCreatedAt(LocalDateTime.now());
    newComment.setUpdatedAt(newComment.getCreatedAt());
    newComment.setPost(foundPost);

    return commentRepository.save(newComment);
  }
  public Comment createReplyComment(Comment comment) {
    Comment foundComment = commentRepository.findCommentById(comment.getId());

    Comment newComment = new Comment();
    newComment.setContent(comment.getContent());
    newComment.setUser(comment.getUser());
    newComment.setCreatedAt(LocalDateTime.now());
    newComment.setUpdatedAt(newComment.getCreatedAt());
    newComment.setParent(foundComment);

    return commentRepository.save(newComment);
  }
}
