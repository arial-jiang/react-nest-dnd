import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Container from './container';
import DragLayer from './dragLayer';

export default () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Container />
        {/* <DragLayer /> */}
      </DndProvider>
    </div>
  );
};
