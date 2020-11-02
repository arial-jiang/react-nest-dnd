import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Container from './container';
import DragLayer from './dragLayer';

export default () => {
  const [end, setEnd] = useState(false);

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Container setEnd={setEnd} />
        <DragLayer end={end} />
      </DndProvider>
    </div>
  );
};
