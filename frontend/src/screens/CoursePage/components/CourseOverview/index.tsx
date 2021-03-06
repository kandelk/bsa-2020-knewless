import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styles from './styles.module.sass';
import { StyledRating } from 'components/StyledRating';
import GradientButton from 'components/buttons/GradientButton';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import '../../styles/common.sass';
import AddToFavouriteButton, { IFavourite } from '@components/AddToFavouritesButton/component';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';
import { IBindingCallback1, IBindingAction } from '@models/Callbacks';
import { Icon, Label } from 'semantic-ui-react';
import { IAuthor } from '@screens/AuthorMainPage/models/IAuthor';
import OverviewModal from '@components/OverviewModal';
import { RoleTypes } from '@containers/AppRouter/models/IRole';

interface ICourseOverviewProps {
  imageSrc: string;
  courseName: string;
  authorName: string;
  authorId: string;
  rating: number;
  startLectureId: string;
  isAuthorized: boolean;
  startCourse: IBindingAction;
  openLoginModal: IBindingCallback1<string>;
  favourite: boolean;
  changeFavourite: IBindingCallback1<IFavourite>;
  role: string;
  author: IAuthor;
  courseId: string;
  progress: number;
  overview: string;
}

const CourseOverview: React.FunctionComponent<ICourseOverviewProps> = ({
  imageSrc,
  courseName,
  authorName,
  authorId,
  rating,
  startLectureId,
  isAuthorized,
  startCourse,
  openLoginModal,
  courseId,
  author,
  progress,
  role,
  favourite,
  changeFavourite,
  overview
}) => {
  const history = useHistory();
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  const onStart = () => {
    if (!isAuthorized) openLoginModal(`/lecture/${startLectureId}`);
    else if (startLectureId !== '') {
      startCourse();
      window.open(`/lecture/${startLectureId}`);
    }
  };

  const onResume = () => {
    if (startLectureId !== '') {
      window.open(`/lecture/${startLectureId}`);
    }
  };

  const onOverviewClose = () => {
    setIsOverviewOpen(false);
  };

  const isUser = role === RoleTypes.USER;
  const isAuthor = role === RoleTypes.AUTHOR;

  const generateLecturesPageLinkTitle = () => {
    if (isUser && progress && progress > 0) {
      return 'Resume';
    }
    if (isAuthor) {
      return 'Revision';
    }
    return 'Start';
  };
  return (
    <div className="content_row">
      <div className={`${styles.description} flex_item aligned_item`}>
        <div className={`${styles.description_content} left_container`}>
          <h1 className={styles.description__course_name}>
            {courseName}
            {author && author?.id === authorId && (
              <Label
                style={{
                  background: 'transparent',
                  color: '#fff',
                  verticalAlign: 'super',
                  position: 'relative',
                  top: '-8px',
                  left: '10px',
                  fontSize: '1.3rem',
                  cursor: 'pointer'
                }}
                onClick={() => history.push(`/course/edit/${courseId}`)}
              >
                <Icon name="pencil" />
              </Label>
            )}
          </h1>
          <div className={styles.description__meta_info}>
            <StyledRating rating={rating} className={`rating ${styles.rating}`} disabled />
            <p>
              {'By '}
              {
                isAuthorized
                  ? <Link to={`/author/${authorId}`}>{authorName}</Link>
                  : <span>{authorName}</span>
              }
            </p>
          </div>
          <div className={styles.description__buttons}>
            <GradientButton
              onClick={(progress && progress > 0 && isUser) || authorId === author?.id ? onResume : onStart}
            >
              {generateLecturesPageLinkTitle()}
            </GradientButton>
            {overview && <GrayOutlineButton onClick={() => setIsOverviewOpen(true)}>Course overview</GrayOutlineButton>}
            {isAuthorized && isUser && (
            <div className={styles.button_favourite_wrp}>
              <AddToFavouriteButton
                isFavourite={favourite}
                changeFavourite={changeFavourite}
                id={courseId}
                type={SourceType.COURSE}
              />
            </div>)}
          </div>
        </div>
      </div>
      <div className={`${styles.course_image} flex_item`}>
        <img src={imageSrc} alt="Course" />
      </div>
      <OverviewModal isOpen={isOverviewOpen} data={overview} onClose={onOverviewClose} />
    </div>
  );
};

export default CourseOverview;
