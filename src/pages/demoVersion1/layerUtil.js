export const getFixedStyles = (
  initialOffset,
  currentOffset,
  differenceOffset,
  depth,
) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  // 拖拽时hover固定遮罩的偏移值
  const groupOffset = 26;
  // const groupOffset = offsetY > 0 ? 16 : 26;
  const fixedOffset = depth === 1 ? groupOffset : 20;
  // 固定遮罩的最大偏移量
  const maxOffset = 39;
  const { y } = initialOffset;
  const { y: currentY } = currentOffset;
  const { y: offsetY } = differenceOffset;
  let resultY = y;
  const multiple = Math.abs(offsetY) / maxOffset;
  // 固定遮罩的偏移量
  const calcGroup =
    offsetY > 0
      ? Math.round(offsetY % multiple)
      : Math.round(offsetY % multiple);
  // const calcGroup = offsetY > 0 ? maxOffset - Math.round(offsetY % multiple) : -(maxOffset + Math.round(offsetY % multiple));
  const calcField = offsetY > 0 ? offsetY - fixedOffset : offsetY + fixedOffset;
  const calcOffset = depth === 1 ? calcGroup : calcField;
  if (Math.abs(offsetY) > fixedOffset) {
    resultY = currentY;
    // resultY = currentY + calcOffset;
  }
  // console.error(1111, offsetY, calcOffset, resultY, currentY)
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
