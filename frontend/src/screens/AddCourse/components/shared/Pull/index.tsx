import React, { useState, useEffect } from 'react';
import { IItem } from '../sharedInterface/IItem';
import { filter } from '../service';
import Item from '../element';
import { Input } from 'semantic-ui-react';
import styles from './styles.module.sass';

interface IPullSetProps {
    items: Array<IItem>;
    remove: Function;
}

const PullSet: React.FunctionComponent<IPullSetProps> = ({
  items,
  remove
}) => {
  const [search, setSearch] = useState('');
  return (
    <div className={styles.sharedContainer}>
      <div className={styles.serchContainer}>
        <Input
          className={styles.inputfield}
          type="text"
          value={search}
          placeholder="search course..."
          onChange={ev => setSearch(ev.target.value)}
          inverted
        />
        <br />
        You can add existing lectures:
      </div>
      <div className={styles.lecturesContainer}>
        {items.map(i => {
          if (filter(i, search)) {
            return (
              <Item
                key={i.id}
                id={i.id}
                name={i.name}
                description={i.description}
                remove={remove}
              />
            );
          }
          return '';
        })}
      </div>
    </div>
  );
};

export default PullSet;
