import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './constants';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '0.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export default ({ fieldName, label, depth, moveCard, findCard, children }) => {
  const originalIndex = findCard(fieldName).index;
  let lastDraggedFieldName = '';
  let lastDropFieldName = '';
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, fieldName, depth, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    // canDrop: () => false,
    hover({ fieldName: draggedFieldName, depth: draggedDepth }, monitor) {
      const end = monitor.isOver();
      const currentEnd = monitor.isOver({ shallow: true });
      const { y: offsetY } = monitor.getDifferenceFromInitialOffset();
      console.error(
        1111,
        fieldName,
        draggedFieldName,
        lastDraggedFieldName,
        lastDropFieldName,
      );
      // if (
      //   draggedFieldName !== fieldName &&
      //   draggedFieldName !== lastDraggedFieldName &&
      //   currentEnd &&
      //   fieldName !== lastDropFieldName &&
      //   fieldName
      // ) {
      //   // 释放在容器的上、下面
      //   lastDraggedFieldName = draggedFieldName;
      //   lastDropFieldName = fieldName;
      //   const { index: overIndex } = findCard(fieldName);
      //   moveCard(draggedFieldName, overIndex, {
      //     fieldName,
      //     depth,
      //     draggedDepth,
      //     draggedFieldName,
      //     offsetY,
      //   });
      // }
    },
  });

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={node => drag(drop(node))} style={{ ...style, opacity }}>
      {label}
      {children}
    </div>
  );
};
