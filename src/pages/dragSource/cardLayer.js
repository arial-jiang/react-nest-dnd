import React from 'react';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '0.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export default ({ label, show, children }) => {
  const color = show ? 'black' : 'white';
  const border = show ? '1px dashed gray' : 'none';
  return (
    <div style={{ ...style, color, border }}>
      {label}
      {children}
    </div>
  );
};
