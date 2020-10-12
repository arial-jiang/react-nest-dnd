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
    // end: (dropResult, monitor) => {
    //   const { fieldName: droppedFieldName, originalIndex: index } = monitor.getItem();
    //   const didDrop = monitor.didDrop();
    //   if (!didDrop) {
    //     moveCard(droppedFieldName, index);
    //   }
    // },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    // canDrop: () => false,
    drop({ fieldName: draggedFieldName, depth: draggedDepth }, monitor) {
      // const end = monitor.isOver();
      // const currentEnd = monitor.isOver({ shallow: true });
      // console.error(1111, depth, draggedDepth, fieldName, draggedFieldName, end, currentEnd)
    },
    hover({ fieldName: draggedFieldName, depth: draggedDepth }, monitor) {
      const end = monitor.isOver();
      const currentEnd = monitor.isOver({ shallow: true });
      // if (depth - draggedDepth > 1 || draggedDepth - depth > 1) {
      //   return;
      // }
      const { y: offsetY } = monitor.getDifferenceFromInitialOffset();
      if (currentEnd) {
        console.error(
          1111,
          fieldName,
          draggedFieldName,
          lastDraggedFieldName,
          lastDropFieldName,
        );
      }
      if (
        draggedFieldName !== fieldName &&
        draggedFieldName !== lastDraggedFieldName &&
        currentEnd &&
        fieldName !== lastDropFieldName &&
        fieldName
      ) {
        // 释放在容器的上、下面
        lastDraggedFieldName = draggedFieldName;
        lastDropFieldName = fieldName;
        const { index: overIndex } = findCard(fieldName);
        moveCard(draggedFieldName, overIndex, {
          fieldName,
          depth,
          draggedDepth,
          draggedFieldName,
          offsetY,
        });
      }
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
