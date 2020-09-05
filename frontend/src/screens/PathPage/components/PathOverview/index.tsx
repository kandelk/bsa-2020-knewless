import React from 'react';
import styles from './styles.module.sass';
import { IPath } from '@screens/PathPage/models/IPath';
import { Label, Icon } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import { RoleTypes } from '@containers/AppRouter/models/IRole';

interface IPathOverviewProps {
  path: IPath;
  isAuthorized: boolean;
  role: string;
  pathId: string;
  userId: string;
}
const PathOverview: React.FunctionComponent<IPathOverviewProps> = ({ isAuthorized,
  path, role, pathId, userId }) => {
  const history = useHistory();
  return (
    <div className={styles.content}>
      <div className={`${styles.path_image}`}>
        <img src={path.imageSrc} alt="Path" />
      </div>
      <div className={styles.description}>
        <h1 className={styles.description__path_name}>
          {path.name}
          {role && role === RoleTypes.AUTHOR && userId === path.userId && (
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
              onClick={() => history.push(`/path/edit/${pathId}`)}
            >
              <Icon name="pencil" />
            </Label>
          )}
        </h1>
        <div className={styles.description__meta_info}>
          <p>
            {'By '}
            {
              isAuthorized
                ? (
                  <Link to={`/author/${path.author?.id}`}>
                    {`${path.author?.firstName} ${path.author?.lastName}`}
                  </Link>
                )
                : <span>{`${path.author?.firstName} ${path.author?.lastName}`}</span>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default PathOverview;
