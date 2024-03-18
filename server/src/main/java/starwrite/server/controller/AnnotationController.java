package starwrite.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import starwrite.server.entity.Annotation;
import starwrite.server.request.CreateAnnotation;
import starwrite.server.service.AnnotationService;

@RestController
@RequestMapping("annotation")
public class AnnotationController {
  private final AnnotationService annotationService;

  @Autowired
  public AnnotationController(AnnotationService annotationService) {
    this.annotationService = annotationService;
  }

//  @PostMapping
//  public Annotation createPostComment(@RequestBody Annotation annotation) {
//    System.out.println("comment controller comment >>>>>>>>>" + annotation);
//    return annotationService.createPostComment(annotation);
//  }

  @PostMapping
  public String createAnnotation(@RequestBody CreateAnnotation annotation) {
    System.out.println("comment controller comment >>>>>>>>>" + annotation);
    return annotationService.createAnnotation(annotation);
  }
}
