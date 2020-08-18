package com.knewless.core.course;

import com.knewless.core.course.dto.*;
import com.knewless.core.lecture.Dto.ShortLectureDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/course")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/recommended/{id}")
    private List<CourseDto> getRecommendedCourses(@PathVariable("id") UUID id,
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10") int size) {
        return courseService.getRecommendedCourses(id, PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    private CourseDto getCourseById(@PathVariable("id") UUID id) {
        return courseService.getCourseById(id);
    }

    @GetMapping("/{id}/info")
    private CourseFullInfoDto getAllCourseInfoById(@PathVariable("id") UUID id) {
        return courseService.getAllCourseInfoById(id);
    }

    @PostMapping("/create")
    private CreateCourseResponseDto createCourse(@CurrentUser UserPrincipal user,
                                                 @RequestBody CreateCourseRequestDto request) {
        return courseService.createCourse(request, user.getId());
    }

    @GetMapping("/lecture/{lectureId}")
    public CourseToPlayerProjection getCourseByLectureId(@PathVariable UUID lectureId) {
        return courseService.getCourseByLectureId(lectureId);
    }

    @GetMapping("/author-latest/{authorId}")
    public ResponseEntity<List<AuthorCourseDto>> getAuthorLatestCourses(@PathVariable UUID authorId) {
        return ResponseEntity.ok(courseService.getLatestCoursesByAuthorId(authorId));
    }

    @GetMapping("author")
    public List<CourseWithMinutesDto> getCoursesByAuthor(@CurrentUser UserPrincipal user) {
        return courseService.getCoursesWithMinutesByUserId(user.getId());
    }

    @GetMapping
    public List<CourseDto> getCourses(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size) {
        return courseService.getCourses(PageRequest.of(page, size));
    }

}
