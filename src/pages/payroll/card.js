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
    hover({ fieldName: draggedFieldName, depth: draggedDepth }, monitor) {
      // console.error(1111, depth, draggedDepth, fieldName, draggedFieldName)
      if (depth - draggedDepth > 1 || draggedDepth - depth > 1) {
        return;
      }
      const { y: offsetY } = monitor.getDifferenceFromInitialOffset();
      if (
        draggedFieldName !== fieldName &&
        draggedFieldName !== lastDraggedFieldName
      ) {
        // 释放在容器的上、下面
        lastDraggedFieldName = draggedFieldName;
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
