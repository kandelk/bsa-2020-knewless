package com.knewless.core.course;

import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CourseMapper {
    CourseMapper MAPPER = Mappers.getMapper(CourseMapper.class);

    static int calculateRating(long allReactions, long positiveReactions) {
        return allReactions == 0 ? 0 :
                Math.round((float) positiveReactions / allReactions);
    }

    @Mapping(source = "category", target = "category.name")
    @Mapping(target = "level", expression = "java(s.getLevel().name())")
    @Mapping(target = "rating", expression = "java(CourseMapper.calculateRating(s.getAllReactions(), s.getPositiveReactions()))")
    CourseDto courseQueryResultToCourseDto(CourseQueryResult s);

    @Mapping(source = "imageSrc", target = "image")
    @Mapping(source = "duration", target = "timeSeconds")
    @Mapping(target = "level", expression = "java(s.getLevel().name())")
    @Mapping(target = "rating", expression = "java(CourseMapper.calculateRating(s.getAllReactions(), s.getPositiveReactions()))")
    CourseWithMinutesDto courseQueryToCourseWithMinutes(CourseQueryResult s);

    @Mapping(target = "progress", ignore = true)
    @Mapping(source = "imageSrc", target = "image")
    @Mapping(source = "duration", target = "timeSeconds")
    @Mapping(target = "level", expression = "java(s.getLevel().name())")
    @Mapping(target = "rating", expression = "java(CourseMapper.calculateRating(s.getAllReactions(), s.getPositiveReactions()))")
    CourseProfileDto courseQueryToCourseProfileDto(CourseQueryResult s);

    @Mapping(source = "category", target = "category.name")
    @Mapping(target = "rating", ignore = true)
    AuthorCourseDto authorCourseQueryResultToAuthorCourseDto(AuthorCourseQueryResult courseQueryResult);

	@Mapping(target = "author", ignore = true)
	@Mapping(target = "authorCourses", ignore = true)
	@Mapping(target = "duration", ignore = true)
	@Mapping(target = "rating", ignore = true)
	@Mapping(target = "lectures", ignore = true)
	@Mapping(target = "tags", ignore = true)
	@Mapping(target = "review", ignore = true)
	CourseFullInfoDto courseToCourseFullInfoDto(Course course);

    @Mapping(target = "members", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "rating",
            expression =
                    "java(CourseMapper.calculateRating(course.getAllReactions(), course.getPositiveReactions()))"
    )
    CourseDetailsDto courseDetailsResultToCourseDetailsDto(CourseDetailsQueryResult course);

    @Mapping(target="authorId", expression = "java(course.getAuthor().getId())")
	@Mapping(target="authorName", expression = "java(course.getAuthor().getFirstName()+ '\\u00A0' + course.getAuthor().getLastName())")
	@Mapping(target="duration", expression = "java(course.getLectures().stream().map(l->l.getDuration()).reduce(0, (a,b) -> a+b))")
	@Mapping(target="rating", expression = "java(CourseMapper.calculateRating(course.getReactions().size(), course.getReactions().stream().map(r->r.getReaction()).filter(r -> r==true).collect(java.util.stream.Collectors.toList()).size()))")
	FavouriteCourseResponseDto courseToFavouriteCourseResponseDto(Course course);
}
