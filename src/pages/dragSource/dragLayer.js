import React from 'react';
import { useDragLayer } from 'react-dnd';
import classnames from 'classnames';
import CardLayer from './cardLayer';
import styles from './index.less';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: 400,
  height: '100%',
};

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default () => {
  const { isDragging, dragItem, initialOffset, currentOffset } = useDragLayer(
    monitor => ({
      dragItem: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );
  if (!isDragging) {
    return null;
  }
  // 列表渲染
  const onDomRender = (data, depth) => {
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
              <CardLayer key={item?.fieldName} label={item?.label}>
                {onDomRender(item?.children, depth + 1)}
              </CardLayer>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={layerStyles}>
      <div
        className={classnames({
          [styles.container]: dragItem?.depth === 1,
          [styles.group]: dragItem?.depth !== 1,
        })}
        style={getItemStyles(initialOffset, currentOffset)}
      >
        <CardLayer key={dragItem?.fieldName} label={dragItem?.label}>
          {onDomRender(dragItem?.card?.children, dragItem?.depth + 1)}
        </CardLayer>
      </div>
    </div>
  );
};
