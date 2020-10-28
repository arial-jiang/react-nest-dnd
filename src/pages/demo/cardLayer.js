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
  // console.error(111, label, show, depth, noBorder, hasChildren);
  return (
    <div
      className={classnames(styles.element, styles.eleBox, {
        [styles.noBorder]: !show,
        [styles.maskElement]: !show,
      })}
      style={{ color, paddingLeft }}
    >
      {label}
      {children}
    </div>
  );
};
