package com.knewless.core.course.dto;

import com.knewless.core.author.dto.AuthorNameIdProjection;
import com.knewless.core.lecture.dto.LectureToPlayerDto;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public interface CourseToPlayerProjection {
    String getId();
    String getName();
    @Value("#{target.author}")
    AuthorNameIdProjection getAuthor();
    List<LectureToPlayerDto> getLectures();
}