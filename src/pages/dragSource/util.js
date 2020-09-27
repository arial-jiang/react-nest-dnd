import update from 'immutability-helper';

// 找到拖动的索引
export const onGetIndex = (
  fieldName,
  data,
  card = { index: [], card: null },
  lastIndex = [],
  depth = 1,
) => {
  if (data?.length > 0) {
    data.forEach((ele, index) => {
      // 找到 正在拖拽的项
      if (ele?.fieldName === fieldName) {
        // 拖拽项 不是第一层的数据时
        if (lastIndex?.length > 0) {
          // 多层的多条数据，将第一条数据的索引吐出来
          if (index > 0) {
            lastIndex.pop();
          }
          // 得到 正在拖拽的项的索（上层索引，当前索引）
          card.index = [...lastIndex, index];
          card.card = ele;
        } else {
          // 拖拽项是第一层数据
          card.index.push(index);
          card.card = ele;
        }
      } else {
        // 在第一层遍历的时候将 lastIndex 置[]
        if (depth === 1) {
          lastIndex = [index];
        } else if (depth === 2) {
          lastIndex = [lastIndex[0], index];
        } else if (depth === 3) {
          lastIndex = [lastIndex[0], lastIndex[1], index];
        }
        // 递归遍历列表的每一项
        onGetIndex(fieldName, ele?.children, card, lastIndex, depth + 1);
      }
    });
  }
  return card;
};

// 根据拖拽index、放开的索引atIndex计算最终位置
export const onCalcPos = (atIndex, index, dropItem, cards, card) => {
  const { offsetY } = dropItem;
  let [atGroup, atSalary, atField] = atIndex;
  let [group, salary, field] = index;
  // const isAdd = Math.abs(offsetY) > 20 && Math.abs(offsetY) < 55;
  const isAdd = false;
  // const hasChildren = card?.children?.length > 0;
  // 一层数据
  if (index?.length === 1) {
    // 释放在一层
    if (atIndex?.length === 1) {
      // 一层同层数据移动：向上移，删除索引 +1
      if (group > atGroup) {
        if (!isAdd) {
          group += 1;
        }
        // 一层同层数据移动：向下移，释放索 +1
      } else if (group < atGroup) {
        atGroup += 1;
      }
      if (isAdd) {
        atSalary = 0;
      }
    }
    // 拖拽二层的数据
  } else if (index?.length === 2) {
    // 释放在一层
    if (atIndex?.length === 1) {
      // 向上移动：删除索引 +1
      if (atGroup <= group) {
        if (!isAdd) {
          group += 1;
        }
      } else {
        // 向下移动：释放索 +1
        atGroup += 1;
      }
      if (isAdd) {
        atSalary = 0;
      }
      // 释放在二层
    } else if (atIndex?.length === 2) {
      // 二层同层数据移动：向上移，删除索引 +1
      if (group === atGroup && salary > atSalary) {
        if (!isAdd) {
          salary += 1;
        }
        // 二层同层数据移动：向下移，释放索 +1
      } else if (group === atGroup && salary < atSalary) {
        atSalary += 1;
      }
      if (isAdd) {
        atField = 0;
      }
      // 释放在三层
    } else if (atIndex?.length === 3) {
      // 一层内，向下移动，释放索引 +1
      if (group === atGroup && salary < atSalary) {
        atSalary += 1;
      }
    }
    // 拖拽三层数据
  } else if (index?.length === 3) {
    // 释放在一层
    if (atIndex?.length === 1) {
      // 向上移，删除索引 +1
      if (atGroup <= group) {
        if (!isAdd) {
          group += 1;
        }
      } else {
        // 向下移，释放索引 +1
        atGroup += 1;
      }
      if (isAdd) {
        atSalary = 0;
      }
      // 释放在二层
    } else if (atIndex?.length === 2) {
      // 一层内，向上移，删除索引 +1
      if (group === atGroup && atSalary <= salary) {
        if (!isAdd) {
          salary += 1;
        }
      } else {
        // 向下移，释放索引 +1
        atSalary += 1;
      }
      if (isAdd) {
        atField = 0;
      }
      // 释放在三层
    } else if (atIndex?.length === 3) {
      // 三层同层数据移动--向上移，删除索引 +1
      if (group === atGroup && salary === atSalary && field > atField) {
        field += 1;
        // 三层同层数据移动--向下移，释放索引 +1
      } else if (group === atGroup && salary === atSalary && field < atField) {
        atField += 1;
      }
    }
  }
  return { atGroup, atSalary, atField, group, salary, field };
};

// 是否可以释放 dropItem：拖拽、释放的数据，拖拽index、放开的索引atIndex
export const onIsDrop = (dropItem, atIndex, index) => {
  let isDrop = true;
  const { fieldName, depth, draggedDepth, draggedFieldName } = dropItem;
  const [atGroup, atSalary, atField] = atIndex;
  const [group, salary, field] = index;
  // console.error(1111, dropItem, atIndex, index)
  // if (isSameLayer || isChildLayer || isToChildLayer) {
  //   isDrop = true;
  // }
  return isDrop;
};

export const onUpdate = (cards, key, card) => {
  const { atGroup, atSalary, atField, group, salary, field } = key;
  // console.error(atGroup, atSalary, atField, group, salary, field);
  const add = update(
    cards,
    typeof atSalary !== 'undefined'
      ? {
          [atGroup]: {
            children:
              typeof atField !== 'undefined'
                ? {
                    [atSalary]: {
                      children: {
                        $splice: [[atField, 0, card]],
                      },
                    },
                  }
                : {
                    $splice: [[atSalary, 0, card]],
                  },
          },
        }
      : typeof atGroup !== 'undefined'
      ? { $splice: [[atGroup, 0, card]] }
      : {},
  );
  const result = update(
    add,
    typeof salary !== 'undefined'
      ? {
          [group]: {
            children:
              typeof field !== 'undefined'
                ? {
                    [salary]: {
                      children: {
                        $splice: [[field, 1]],
                      },
                    },
                  }
                : {
                    $splice: [[salary, 1]],
                  },
          },
        }
      : typeof group !== 'undefined'
      ? { $splice: [[group, 1]] }
      : {},
  );
  return result;
};
