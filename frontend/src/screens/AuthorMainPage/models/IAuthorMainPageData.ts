import { IAuthor } from './IAuthor';
import { ICourseCardProps } from 'components/CourseCard';
import { IPathCardProps } from 'components/PathCard';

export interface IAuthorMainPageData {
  author: IAuthor;
  courses: ICourseCardProps[];
  paths: IPathCardProps[];
}