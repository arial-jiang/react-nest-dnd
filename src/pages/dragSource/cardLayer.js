import React from 'react';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '0.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export default ({ label, children }) => {
  return (
    <div style={{ ...style }}>
      {label}
      {children}
    </div>
  );
};
