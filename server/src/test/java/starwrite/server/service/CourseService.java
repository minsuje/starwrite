package starwrite.server.service;

import org.springframework.stereotype.Service;
import starwrite.server.dto.Course;
import starwrite.server.repository.CourseRepository;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }
    public Course addCourses(Course course){
        return courseRepository.save(course);
    }
}
