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
  isLast,
  hasChildren,
  children,
  setEnd,
}) => {
  const [text, setText] = useState('');
  const { index: originalIndex, card } = findCard(fieldName);
  let lastDraggedFieldName = '';
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.CARD,
      fieldName,
      label,
      card,
      depth,
      originalIndex,
      isLast,
      hasChildren,
    },
    canDrag(monitor) {
      if (fieldName?.includes(DATA_EMPTY)) {
        return false;
      }
      return true;
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    // canDrop: () => false,
    drop() {
      setEnd(false);
    },
    hover({ fieldName: draggedFieldName, depth: draggedDepth }, monitor) {
      const { y: offsetY } = monitor.getDifferenceFromInitialOffset();
      // console.error('hover: ', fieldName, draggedFieldName, offsetY, depth)
      if (!fieldName || !draggedFieldName) {
        return;
      }
      if (
        draggedFieldName !== fieldName &&
        draggedFieldName !== lastDraggedFieldName &&
        !fieldName?.includes(draggedFieldName)
      ) {
        const { index: overIndex } = findCard(fieldName);
        const { children: draggedNum } = findCard(draggedFieldName);
        // console.error(2222, fieldName, draggedFieldName, offsetY, draggedNum);
        if (
          (draggedDepth === 1 && draggedNum === 2) ||
          (depth !== 1 && draggedNum === 1)
        ) {
          return;
        }
        lastDraggedFieldName = draggedFieldName;
        moveCard(draggedFieldName, overIndex, {
          fieldName,
          depth,
          draggedDepth,
          draggedFieldName,
          offsetY,
          lastFieldName,
        });
      }
    },
  });

  const opacity = isDragging ? 0 : 1;
  const paddingLeft = depth ? `${depth}rem` : '1rem';

  return (
    <div
      key={fieldName}
      ref={node => drag(drop(node))}
      className={classnames(styles.element, {
        [styles.empty]: fieldName?.includes(DATA_EMPTY),
        [styles.noBorder]:
          noBorder || (!fieldName?.includes(DATA_EMPTY) && depth === 3),
        [styles.eleBox]: hasChildren,
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
