import React from 'react';
import { useDragLayer } from 'react-dnd';
import classnames from 'classnames';

import CardLayer from './cardLayer';
import { getFixedStyles, getItemStyles } from './layerUtil';
import { DATA_EMPTY } from './constants';

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
            noBorder={item?.children?.length === 0 && depth !== 3}
            depth={depth}
            isLast={item?.isLast}
            hasChildren={item?.hasChildren}
          />
          {item?.children?.length > 0 &&
            onDomRender(item?.children, depth + 1, show)}
          {item?.children?.length === 0 && (
            <CardLayer
              key={`${depth}-${item?.fieldName}`}
              label={DATA_EMPTY}
              show={show}
              depth={depth}
              isLast={item?.isLast}
              hasChildren={item?.hasChildren}
            />
          )}
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
        })}
      >
        <div
          className={classnames(styles.maskContainer, {
            [styles.maskFrame]: dragItem?.depth !== 1 && !dragItem?.isLast,
            [styles.dragEle]: dragItem?.depth !== 1 && dragItem?.isLast,
          })}
          style={getFixedStyles(
            initialOffset,
            currentOffset,
            differenceOffset,
            dragItem?.depth,
            dragItem?.isLast,
          )}
        >
          <CardLayer
            key={dragItem?.fieldName}
            label={dragItem?.label}
            show={false}
            isLast={dragItem?.isLast}
            hasChildren={dragItem?.hasChildren}
          />
          {dragItem?.card?.children?.length > 0 &&
            onDomRender(dragItem?.card?.children, dragItem?.depth + 1, false)}
          {dragItem?.card?.children?.length === 0 && (
            <CardLayer
              key={`${dragItem?.depth}-${dragItem?.fieldName}`}
              label={DATA_EMPTY}
              show={false}
              isLast={dragItem?.isLast}
              hasChildren={dragItem?.hasChildren}
            />
          )}
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
            noBorder={
              dragItem?.card?.children?.length === 0 && dragItem?.depth !== 3
            }
            depth={dragItem?.depth}
            isLast={dragItem?.isLast}
            hasChildren={dragItem?.hasChildren}
          />
          {dragItem?.card?.children?.length > 0 &&
            onDomRender(dragItem?.card?.children, dragItem?.depth + 1, true)}
          {dragItem?.card?.children?.length === 0 && (
            <CardLayer
              key={`${dragItem?.depth}-${dragItem?.fieldName}`}
              label={DATA_EMPTY}
              show={true}
              depth={dragItem?.depth}
              isLast={dragItem?.isLast}
              hasChildren={dragItem?.hasChildren}
            />
          )}
        </div>
      </div>
    </div>
  );
};
