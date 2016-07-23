import React from 'react';

import styles from './styles.css';

function ListItem(props) {
  return (
    <li className={styles.item}>
      {props.item}
    </li>
  );
}

ListItem.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.any,
};

export default ListItem;
