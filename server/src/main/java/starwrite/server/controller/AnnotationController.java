package starwrite.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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


  // 어노테이션 생성
  @PostMapping
  public String createAnnotation(@RequestBody CreateAnnotation annotation) {
    System.out.println("comment controller comment >>>>>>>>>" + annotation);
    return annotationService.createAnnotation(annotation);
  }



}
