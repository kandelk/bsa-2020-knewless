import React from 'react';
import { Icon, Label, Popup } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { User } from '../index';
import Notifications from '../../../containers/Notifications';
import PopupMenu from '../PopupMenu';

interface IUserElementProps {
  user: User;
}

const UserElement = ({ user }: IUserElementProps) => (
  <div className={styles.profileWrp}>
    <Label
      basic
      size="tiny"
      className={styles.toolbarBtn}
      onClick={() => { console.log('clicked'); }}
    >
      <Icon name="heart" size="big" inverted />
    </Label>
    <Notifications user={{ id: user.id }} styleName={styles.toolbarBtn} />
    <Popup
      id={styles.popup}
      on="click"
      trigger={(
        <div className={styles.imageborder}>
          <img src={user.avatar} className={styles.avatar} alt={user.name} />
        </div>
        )}
      position="bottom right"
      flowing
      hoverable
    >
      <Popup.Content>
        <PopupMenu />
      </Popup.Content>
    </Popup>
  </div>
);

export default UserElement;
