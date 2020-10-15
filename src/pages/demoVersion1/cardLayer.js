import React from 'react';
import classnames from 'classnames';

import { DATA_EMPTY } from './constants';
import styles from './index.less';

export default ({
  label,
  show,
  depth,
  noBorder,
  isLast,
  hasChildren,
  children,
}) => {
  const color = show ? 'black' : 'white';
  const paddingLeft = depth ? `${depth}rem` : '1rem';
  return (
    <div
      className={classnames(styles.element, {
        [styles.empty]: label === DATA_EMPTY,
        [styles.noBorder]: !show || (show && noBorder),
        [styles.eleBox]: hasChildren || depth === 3,
      })}
      style={{ color, paddingLeft }}
    >
      {label}
      {children}
    </div>
  );
};
