import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from './constants';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '0.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export default ({ fieldName, label, depth, moveCard, findCard, children }) => {
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
    hover({ fieldName: draggedFieldName, depth: draggedDepth }, monitor) {
      // console.error(1111, depth, draggedDepth, fieldName, draggedFieldName)
      const { y: offsetY } = monitor.getDifferenceFromInitialOffset();
      if (
        draggedFieldName !== fieldName &&
        draggedFieldName !== lastDraggedFieldName
      ) {
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
  const height = isDragging ? '' : 'auto';

  return (
    <div
      ref={node => drag(drop(node))}
      style={{ ...style, opacity, height }}
      onClick={() => setText(1234)}
    >
      {label}
      {text}
      {children}
    </div>
  );
};
