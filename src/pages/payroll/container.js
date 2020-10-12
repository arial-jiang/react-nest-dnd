import React, { useState } from 'react';

import Card from './card';
import { ITEMS } from './constants';
import { onGetIndex, onCalcPos, onUpdate, onIsDrop } from './util';

import styles from './index.less';

export default () => {
  const [cards, setCards] = useState(ITEMS);

  // 找到拖拽的项，返回选中项和索引
  const findCard = fieldName => {
    const { card, index } = onGetIndex(fieldName, cards);
    return {
      card,
      index,
    };
  };

  /**
   * 移动
   * @param {string} fieldName 拖拽的项
   * @param {array} atIndex 释放的项的索引
   */
  const moveCard = (fieldName, atIndex, dropItem) => {
    const { card, index } = findCard(fieldName);
    // if (onIsDrop(dropItem, atIndex, index)) {
    const key = onCalcPos(atIndex, index);
    // console.error(111, fieldName, card, index, atIndex, key);
    const result = onUpdate(cards, key, card);
    setCards(result);
    // }
  };

  // 列表渲染
  const onDomRender = (data, depth) => {
    if (depth > 3) {
      return;
    }
    return data?.map(item => {
      return (
        <Card
          key={item?.fieldName}
          fieldName={item?.fieldName}
          label={item?.label}
          depth={depth}
          moveCard={moveCard}
          findCard={findCard}
        >
          {onDomRender(item?.children, depth + 1)}
        </Card>
      );
    });
  };

  return <>{onDomRender(cards, 1)}</>;
};
