import React, { useState } from 'react';

import classnames from 'classnames';

import Card from './card';
import { ITEMS, DATA_EMPTY } from './constants';
import { onGetIndex, onCalcPos, onUpdate, onInitialData } from './util';

import styles from './index.less';

export default () => {
  const [cards, setCards] = useState(onInitialData(ITEMS, 1));

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
    // console.error(111, fieldName, card, index, atIndex, key, dropItem);
    const key = onCalcPos(atIndex, index, dropItem, cards, card);
    const result = onUpdate(cards, key, card, dropItem);
    setCards(result);
  };

  console.error(1111, cards);

  // 列表渲染
  const onDomRender = (data, depth) => {
    if (depth > 3) {
      return;
    }
    return data?.map((item, index) => {
      return (
        <div
          className={classnames({
            [styles.container]: depth === 1,
            [styles.group]: depth !== 1,
          })}
          key={item?.fieldName}
        >
          <Card
            key={item?.fieldName}
            fieldName={item?.fieldName}
            label={item?.label}
            depth={depth}
            noBorder={item?.noBorder}
            moveCard={moveCard}
            findCard={findCard}
          />
          {item?.children?.length > 0 && onDomRender(item?.children, depth + 1)}
        </div>
      );
    });
  };

  return <>{onDomRender(cards, 1, [])}</>;
};
