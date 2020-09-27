import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import classnames from 'classnames';

import Card from './card';
import { ItemTypes, ITEMS } from './constants';
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
    const key = onCalcPos(atIndex, index, dropItem, cards, card);
    // console.error(111, fieldName, card, index, atIndex, key);
    const result = onUpdate(cards, key, card, dropItem);
    setCards(result);
  };

  const [, drop] = useDrop({ accept: ItemTypes.CARD });

  // 列表渲染
  const onDomRender = (data, depth) => {
    if (depth > 3) {
      return;
    }
    return (
      <div ref={drop}>
        {data?.map(item => {
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
                moveCard={moveCard}
                findCard={findCard}
              ></Card>
              {onDomRender(item?.children, depth + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  return <>{onDomRender(cards, 1)}</>;
};
