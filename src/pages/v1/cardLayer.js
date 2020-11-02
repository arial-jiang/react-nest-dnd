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
  dragDepth,
}) => {
  const color = show ? 'black' : 'white';
  const paddingLeft = depth ? `${depth}rem` : '1rem';
  return (
    <div
      className={classnames(styles.element, styles.eleBox, {
        [styles.noBorder]:
          !show ||
          (show && depth === dragDepth && !hasChildren) ||
          (show && dragDepth === 3),
        [styles.maskElement]: dragDepth === 2,
        [styles.maskElementBox]:
          (!show && dragDepth !== 2) || (show && dragDepth === 3),
      })}
      style={{ color, paddingLeft }}
    >
      {label}
      {children}
    </div>
  );
};
