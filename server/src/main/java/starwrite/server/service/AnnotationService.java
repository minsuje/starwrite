package starwrite.server.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import starwrite.server.auth.SecurityUtil;
import starwrite.server.entity.Annotation;
import starwrite.server.entity.Post;
import starwrite.server.entity.Users;
import starwrite.server.repository.AnnotationRepository;
import starwrite.server.repository.PostRepository;
import starwrite.server.request.CreateAnnotation;
import starwrite.server.request.UpdateAnnotation;
import starwrite.server.response.UserResponse;

@Service
public class AnnotationService {

  @Autowired
  AnnotationRepository annotationRepository;

  @Autowired
  PostRepository postRepository;


  // 어노테이션 생성
  public String createAnnotation(CreateAnnotation annotation) {
    String userId = SecurityUtil.getCurrentUserUserId();
    annotationRepository.createAnnotation(annotation.getAnnotation().getContent(),
        annotation.getAnnotation().getType(), LocalDateTime.now(), annotation.getAnnotation().getPosition(), annotation.getPostId(), userId);
    return "success";
  }



  // 어노테이션 수정
  public String updateAnnotation(UpdateAnnotation annotation) {
    annotationRepository.updateAnnotation(annotation.getAnnotationId(), annotation.getContent(), annotation.getPosition());
    return "success";
  }


  // 어노테이션 삭제
   public String deleteAnnotation(String annotationId) {
    annotationRepository.deleteAnnotation(annotationId);
    return "success";
  }



  public Annotation createReplyComment(Annotation annotation) {
    Annotation foundAnnotation = annotationRepository.findCommentById(annotation.getId());

    Annotation newAnnotation = new Annotation();
    newAnnotation.setContent(annotation.getContent());
    newAnnotation.setUser(annotation.getUser());
    newAnnotation.setCreatedAt(LocalDateTime.now());
    newAnnotation.setUpdatedAt(newAnnotation.getCreatedAt());
    newAnnotation.setParent(foundAnnotation);

    return annotationRepository.save(newAnnotation);
  }

//  public List<Annotation> getCommentsByPostId() {
//    return annotationRepository.findAll();
//  }
//
//  public Annotation createPostComment(Annotation annotation) {
//    System.out.println("comment postid >>>>>>>>>>>>>>>>>>>>>>>>>" + annotation.getPost());
//    Post foundPost = postRepository.findPostById(annotation.getPost().getPostId());
//    System.out.println("foundPost >>>>>>>>>>" + foundPost);
//
//    Annotation newAnnotation = new Annotation();
//    newAnnotation.setContent(annotation.getContent());
//    newAnnotation.setUser(annotation.getUser());
//    newAnnotation.setCreatedAt(LocalDateTime.now());
//    newAnnotation.setUpdatedAt(newAnnotation.getCreatedAt());
//    newAnnotation.setPost(foundPost);
//
//    return annotationRepository.save(newAnnotation);
//  }


}
