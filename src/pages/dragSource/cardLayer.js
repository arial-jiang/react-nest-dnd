import React from 'react';

import styles from './index.less';

export default ({ label, show, depth, children }) => {
  const color = show ? 'black' : 'white';
  const borderBottom = show ? '1px solid gray' : 'none';
  const paddingLeft = depth ? `${depth}rem` : '1rem';
  return (
    <div
      className={styles.element}
      style={{ color, borderBottom, paddingLeft }}
    >
      {label}
      {children}
    </div>
  );
};
