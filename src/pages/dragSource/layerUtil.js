export const getFixedStyles = (
  initialOffset,
  currentOffset,
  differenceOffset,
) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  const { y } = initialOffset;
  const { y: currentY } = currentOffset;
  const { y: offsetY } = differenceOffset;
  let resultY = y;
  if (Math.abs(offsetY) > 30) {
    resultY = currentY;
  }
  const transform = `translateY(${resultY}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

export const getItemStyles = currentOffset => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  const { y } = currentOffset;
  const transform = `translateY(${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};
