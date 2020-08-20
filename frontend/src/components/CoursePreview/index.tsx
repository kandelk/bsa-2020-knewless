import React from 'react';
import styles from './styles.module.sass';
import { Button, Icon, Label } from 'semantic-ui-react';
import { StyledRating } from '@components/StyledRating';
import { NavLink } from 'react-router-dom';

export interface ICoursePreviewProps {
  id?: string;
  image: string;
  authorName: string;
  authorId?: string;
  lecturesNumber: number;
  durationMinutes: number;
  description?: string;
  name: string;
  level: string;
  tags?: string[];
  rating: number;
  flag?: boolean;
  action?: (any) => void;
}

export const CoursePreview: React.FC<ICoursePreviewProps> = ({
  image, lecturesNumber, durationMinutes, level, flag, action, name, description,
  id, authorName, authorId, tags, rating
}) => {
  const optionalIcon = (isSelected: boolean) => {
    switch (isSelected) {
      case true:
        return (
          <Label basic size="big" className={styles.toolBarIcon} onClick={action}>
            <Icon className={styles.addIcon} name="delete" size="large" inverted color="pink" />
          </Label>
        );
      case false:
        return (
          <Label basic size="big" className={styles.toolBarIcon} onClick={action}>
            <Icon className={styles.addIcon} name="check" size="large" inverted color="green" />
          </Label>
        );
      case undefined:
        return '';
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.meta__image}>
          {flag !== undefined ? <img src={image} alt="" className={styles.inactive_avatar} />
            : (
              <div className={styles.uploadWrapper}>
                <img src={image} alt="" className={styles.avatar} />
                <Button as="label" className={styles.uploader}>
                  upload...
                <input name="image" type="file" onChange={e => action(e.target.files[0])} hidden />
              </Button>
            </div>
          )}
      </div>
      <div className={styles.card_content_box}>
        <StyledRating
          className={styles.course_rating}
          size='small'
          style={{ fontSize: '1.2em', width: '8rem' }}
          rating={rating}
          disabled
        />
        <div className={styles.tags}>
          {tags?.length > 0 && tags.map((t, index) => <span key={index}>{t}</span>)}
        </div>
        <div className={styles.course_name}>
          <NavLink exact to={`/course/${id}`}>
            <span className={styles.nameText}>
              {name}
            </span>
          </NavLink>
        </div>
        <div className={styles.author}>
          <NavLink exact to={`/author/${authorId}`}>
            <span><i>by {authorName}</i></span>
          </NavLink>
        </div>
        <div className={styles.description}>
          <span className={styles.description_text}>
            {!description || description === ''
              ? 'Fill in the fields with information about your course'
              : description.length > 75 ? description.substring(0, 75) + '...' : description}
          </span>
        </div>
        <div className={styles.grid_row_flex}>
          <div className={styles.bottomflex}>
            <div>
              <span className={styles.meta__lectures}>lectures:</span>
              <span className={styles.number}>{lecturesNumber}</span>
            </div>
            <div>
              <span className={styles.meta__lectures}>minutes:</span>
              <span className={styles.number}>{durationMinutes}</span>
            </div>
            <div>
              <span className={styles.levelText}>{level}</span>
            </div>
          </div>
        </div>
        <div className={styles.optional_element}>
          {optionalIcon(flag)}
        </div>
      </div>
    </div>
  );
};
