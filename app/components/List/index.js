import React from 'react';

import styles from './styles.css';

function List(props) {
  const ComponentToRender = props.component;
  const content = props.items.map((item, index) => (
    <ComponentToRender key={`item-${index}`} item={item} />
  ));

  return (
    <ul className={styles.list}>
      {content}
    </ul>
  );
}

List.propTypes = {
  component: React.PropTypes.func.isRequired,
  items: React.PropTypes.array.isRequired,
};

export default List;
