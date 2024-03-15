package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.entity.Annotation;
import starwrite.server.entity.Post;
import starwrite.server.repository.CommentRepository;
import starwrite.server.repository.PostRepository;

@Service
public class AnnotationService {
  private final CommentRepository commentRepository;

  private final PostRepository postRepository;

  @Autowired
  public AnnotationService(CommentRepository commentRepository, PostRepository postRepository) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
  }

  public List<Annotation> getCommentsByPostId() {
    return commentRepository.findAll();
  }

  public Annotation createPostComment(Annotation annotation) {
    System.out.println("comment postid >>>>>>>>>>>>>>>>>>>>>>>>>" + annotation.getPost());
    Post foundPost = postRepository.findPostById(annotation.getPost().getPostId());
    System.out.println("foundPost >>>>>>>>>>" + foundPost);

    Annotation newAnnotation = new Annotation();
    newAnnotation.setContent(annotation.getContent());
    newAnnotation.setUser(annotation.getUser());
    newAnnotation.setCreatedAt(LocalDateTime.now());
    newAnnotation.setUpdatedAt(newAnnotation.getCreatedAt());
    newAnnotation.setPost(foundPost);

    return commentRepository.save(newAnnotation);
  }
  public Annotation createReplyComment(Annotation annotation) {
    Annotation foundAnnotation = commentRepository.findCommentById(annotation.getId());

    Annotation newAnnotation = new Annotation();
    newAnnotation.setContent(annotation.getContent());
    newAnnotation.setUser(annotation.getUser());
    newAnnotation.setCreatedAt(LocalDateTime.now());
    newAnnotation.setUpdatedAt(newAnnotation.getCreatedAt());
    newAnnotation.setParent(foundAnnotation);

    return commentRepository.save(newAnnotation);
  }
}
