import React from 'react';
import { useDragLayer } from 'react-dnd';
import classnames from 'classnames';
import CardLayer from './cardLayer';
import styles from './index.less';

const fixStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 99,
  top: 0,
  left: 0,
  width: 400,
  height: '100%',
};

function getFixedStyles(initialOffset, currentOffset, differenceOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = initialOffset;
  const { y: currentY } = currentOffset;
  const { y: offsetY } = differenceOffset;
  let showY = y;
  if (Math.abs(offsetY) > 50) {
    showY = currentY;
  }
  const transform = `translate(${x}px, ${showY}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: 400,
  height: '100%',
  backgroundColor: 'transparent',
};

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default () => {
  const {
    isDragging,
    dragItem,
    initialOffset,
    currentOffset,
    differenceOffset,
  } = useDragLayer(monitor => ({
    dragItem: monitor.getItem(),
    itemType: monitor.getItemType(),
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
    return (
      <div>
        {data?.map(item => {
          return (
            <div
              className={classnames({
                [styles.container]: depth === 1,
                [styles.group]: depth !== 1,
              })}
              key={item?.fieldName}
            >
              <CardLayer key={item?.fieldName} label={item?.label} show={show}>
                {onDomRender(item?.children, depth + 1)}
              </CardLayer>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {/* 拖拽后一个假的结构，用来覆盖未拖动的项 */}
      <div style={fixStyles}>
        <div
          style={getFixedStyles(initialOffset, currentOffset, differenceOffset)}
        >
          <CardLayer
            key={dragItem?.fieldName}
            label={dragItem?.label}
            show={false}
          >
            {onDomRender(dragItem?.card?.children, dragItem?.depth + 1, false)}
          </CardLayer>
        </div>
      </div>

      <div style={layerStyles}>
        <div
          className={classnames({
            [styles.container]: dragItem?.depth === 1,
            [styles.group]: dragItem?.depth !== 1,
          })}
          style={getItemStyles(currentOffset)}
        >
          <CardLayer
            key={dragItem?.fieldName}
            label={dragItem?.label}
            show={true}
          >
            {onDomRender(dragItem?.card?.children, dragItem?.depth + 1, true)}
          </CardLayer>
        </div>
      </div>
    </div>
  );
};
