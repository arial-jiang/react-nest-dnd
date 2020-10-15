import React, { useState } from 'react';

import classnames from 'classnames';

import Card from './card';
import { ITEMS, DATA_EMPTY } from './constants';
import { onGetIndex, onCalcPos, onUpdate } from './util';

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
    const { depth, lastFieldName, fieldName: droppedFieldName } = dropItem;
    // console.error(
    //   'before: ',
    //   droppedFieldName,
    //   lastFieldName,
    //   placeIndex,
    //   index,
    //   depth,
    // );
    let placeIndex = atIndex;
    let isAdd = false;
    if (droppedFieldName?.includes(DATA_EMPTY)) {
      const { index: dropIndex } = findCard(lastFieldName);
      placeIndex = dropIndex;
      isAdd = true;
    }
    if (placeIndex === index || index?.length === 0) {
      // if (placeIndex === index || index?.length === 0 || droppedFieldName?.includes(lastFieldName)) {
      return;
    }
    // console.error(
    //   'after: ',
    //   droppedFieldName,
    //   lastFieldName,
    //   placeIndex,
    //   index,
    //   depth,
    // );
    const key = onCalcPos(placeIndex, index, dropItem, cards, card, isAdd);
    const result = onUpdate(cards, key, card, dropItem);
    // console.error(111, fieldName, droppedFieldName, card, index, key, atIndex, dropItem);
    setCards(result);
  };

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
          key={`${item?.fieldName}-r`}
        >
          <Card
            key={`${item?.fieldName}-c`}
            fieldName={item?.fieldName}
            label={item?.label}
            depth={depth}
            noBorder={item?.children?.length === 0 && depth !== 3}
            isLast={
              item?.children?.length === 0 &&
              index === data?.length - 1 &&
              depth !== 1
            }
            hasChildren={item?.children?.length > 0}
            moveCard={moveCard}
            findCard={findCard}
          />
          {item?.children?.length > 0 && onDomRender(item?.children, depth + 1)}
          {item?.children?.length === 0 && (
            <Card
              key={`${DATA_EMPTY}-${item?.fieldName}`}
              fieldName={`${item?.fieldName}-${DATA_EMPTY}`}
              label={`${item?.fieldName}-${DATA_EMPTY}`}
              depth={depth}
              lastFieldName={item?.fieldName}
              moveCard={moveCard}
              findCard={findCard}
            />
          )}
        </div>
      );
    });
  };

  return <>{onDomRender(cards, 1, [])}</>;
};
