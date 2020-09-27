// import React from 'react';
// import ReactDOM from 'react-dom';

// import Board from './board';
// import { observe } from './game';

// observe((knightPosition) =>
//   ReactDOM.render(<Board knightPosition={knightPosition} />, document.getElementById('root'))
// );

import React, { useState, useEffect } from 'react';

import Board from './board';
import { observe } from './game';

const containerStyle = {
  width: 500,
  height: 500,
  border: '1px solid gray',
};

export default () => {
  const [knightPos, setKnightPos] = useState([1, 7]);

  useEffect(() => observe(newPos => setKnightPos(newPos)), [observe]);

  return (
    <div>
      <div style={containerStyle}>
        <Board knightPosition={knightPos} />
      </div>
    </div>
  );
};
