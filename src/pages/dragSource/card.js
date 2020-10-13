import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classnames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes, DATA_EMPTY } from './constants';
import styles from './index.less';

export default ({
  fieldName,
  label,
  depth,
  moveCard,
  findCard,
  noBorder,
  lastFieldName,
  children,
}) => {
  const [text, setText] = useState('');
  const { index: originalIndex, card } = findCard(fieldName);
  // console.error(111, originalIndex, card, fieldName, lastFieldName, depth)
  let lastDraggedFieldName = '';
  let isAdd = false;
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.CARD,
      fieldName,
      label,
      card,
      depth,
      originalIndex,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    // end: (dropResult, monitor) => {
    //   const { fieldName: droppedFieldName, originalIndex: index } = monitor.getItem();
    //   const didDrop = monitor.didDrop();
    //   if (!didDrop) {
    //     moveCard(droppedFieldName, index);
    //   }
    // },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    // canDrop: () => false,
    drop({ fieldName: draggedFieldName, depth: draggedDepth }, monitor) {
      const { y: offsetY } = monitor.getDifferenceFromInitialOffset();
      // console.error(1111, depth, draggedDepth, fieldName, draggedFieldName, offsetY)
    },
    hover({ fieldName: draggedFieldName, depth: draggedDepth }, monitor) {
      const { y: offsetY } = monitor.getDifferenceFromInitialOffset();
      if (!fieldName || !draggedFieldName) {
        return;
      }
      if (draggedFieldName !== fieldName) {
        isAdd = false;
        lastDraggedFieldName = draggedFieldName;
        if (
          (Math.abs(offsetY) > 20 && depth !== 1) ||
          (Math.abs(offsetY) > 26 && depth === 1)
        ) {
          isAdd = true;
          // console.error(2222, fieldName, draggedFieldName, offsetY);
          const { index: overIndex } = findCard(fieldName);
          moveCard(draggedFieldName, overIndex, {
            fieldName,
            depth,
            draggedDepth,
            draggedFieldName,
            offsetY,
            lastFieldName,
          });
        }
      }
    },
  });

  const opacity = isDragging ? 0 : 1;
  const paddingLeft = depth ? `${depth}rem` : '1rem';

  return (
    <div
      ref={node => drag(drop(node))}
      className={classnames(styles.element, {
        [styles.empty]: fieldName === DATA_EMPTY,
        [styles.noBorder]: noBorder,
      })}
      style={{ opacity, paddingLeft }}
      onClick={() => setText(1234)}
    >
      {label}
      {text}
      {children}
    </div>
  );
};
