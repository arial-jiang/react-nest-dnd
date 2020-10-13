import React from 'react';
import { useDragLayer } from 'react-dnd';
import classnames from 'classnames';

import CardLayer from './cardLayer';
import { getFixedStyles, getItemStyles } from './layerUtil';

import styles from './index.less';

export default () => {
  const {
    isDragging,
    dragItem,
    initialOffset,
    currentOffset,
    differenceOffset,
  } = useDragLayer(monitor => ({
    dragItem: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
    differenceOffset: monitor.getDifferenceFromInitialOffset(),
  }));
  if (!isDragging) {
    return null;
  }
  // 列表渲染
  const onDomRender = (data, depth, show) => {
    if (depth > 3) {
      return;
    }
    return data?.map(item => {
      return (
        <div
          className={classnames({
            [styles.container]: depth === 1,
            [styles.group]: depth !== 1,
          })}
          key={item?.fieldName}
        >
          <CardLayer
            key={item?.fieldName}
            label={item?.label}
            show={show}
            depth={depth}
          ></CardLayer>
          {onDomRender(item?.children, depth + 1, show)}
        </div>
      );
    });
  };

  return (
    <div>
      {/* 拖拽后一个假的结构，用来覆盖未拖动的项 */}
      <div
        className={classnames(styles.mask, styles.maskLayer, {
          [styles.offsetToBottom]: differenceOffset?.y > 0,
          // [styles.showLayer]: Math.abs(differenceOffset?.y) > 30,
        })}
      >
        <div
          className={classnames(styles.maskContainer, {
            [styles.maskFrame]: dragItem?.depth !== 1,
          })}
          style={getFixedStyles(
            initialOffset,
            currentOffset,
            differenceOffset,
            dragItem?.depth,
          )}
        >
          <CardLayer
            key={dragItem?.fieldName}
            label={dragItem?.label}
            show={false}
          ></CardLayer>
          {onDomRender(dragItem?.card?.children, dragItem?.depth + 1, false)}
        </div>
      </div>

      <div className={classnames(styles.mask, styles.dragLayer, {})}>
        <div
          className={classnames(styles.dragEle, {
            [styles.container]: dragItem?.depth === 1,
            [styles.group]: dragItem?.depth !== 1,
          })}
          style={getItemStyles(currentOffset)}
        >
          <CardLayer
            key={dragItem?.fieldName}
            label={dragItem?.label}
            show={true}
            depth={dragItem?.depth}
          ></CardLayer>
          {onDomRender(dragItem?.card?.children, dragItem?.depth + 1, true)}
        </div>
      </div>
    </div>
  );
};
