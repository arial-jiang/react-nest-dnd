import React from 'react';
import classnames from 'classnames';

import { DATA_EMPTY } from './constants';
import styles from './index.less';

export default ({ label, show, depth, noBorder, children }) => {
  const color = show ? 'black' : 'white';
  const borderBottom = show ? (noBorder ? 'none' : '1px solid gray') : 'none';
  const paddingLeft = depth ? `${depth}rem` : '1rem';
  return (
    <div
      className={classnames(styles.element, {
        [styles.empty]: label === DATA_EMPTY,
        [styles.noBorder]: noBorder,
      })}
      style={{ color, borderBottom, paddingLeft }}
    >
      {label}
      {children}
    </div>
  );
};
