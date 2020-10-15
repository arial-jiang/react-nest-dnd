import React, { useState } from 'react';

import classnames from 'classnames';

import Card from './card';
import { ITEMS, DATA_EMPTY } from './constants';
import { onGetIndex, onCalcPos, onUpdate } from './util';
import CardLayer from './cardLayer';

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
    let placeIndex = atIndex;
    let isAdd = false;
    if (droppedFieldName === DATA_EMPTY) {
      const { index: dropIndex } = findCard(lastFieldName);
      placeIndex = dropIndex;
      isAdd = true;
    }
    if (placeIndex === index || index?.length === 0) {
      return;
    }
    console.error(
      111,
      droppedFieldName,
      lastFieldName,
      placeIndex,
      index,
      depth,
    );
    // console.error(111, fieldName, card, index, atIndex, key, dropItem);
    const key = onCalcPos(placeIndex, index, dropItem, cards, card, isAdd);
    const result = onUpdate(cards, key, card, dropItem);
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
          key={item?.fieldName}
        >
          <Card
            key={item?.fieldName}
            fieldName={item?.fieldName}
            label={item?.label}
            depth={depth}
            noBorder={item?.children?.length === 0 && depth !== 3}
            moveCard={moveCard}
            findCard={findCard}
          />
          {item?.children?.length > 0 && onDomRender(item?.children, depth + 1)}
          {item?.children?.length === 0 && depth !== 3 && (
            <Card
              key={`${depth}-${item?.fieldName}`}
              fieldName={DATA_EMPTY}
              label={DATA_EMPTY}
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

  const onRender = (data, depth, show) => {
    if (depth > 3) {
      return;
    }
    return data?.map(item => {
      return (
        <div
          className={classnames({
            [styles.container]: depth === 1,
            [styles.group]: depth !== 1,
          })}
          key={item?.fieldName}
        >
          <CardLayer
            key={item?.fieldName}
            label={item?.label}
            show={show}
            noBorder={item?.children?.length === 0 && depth !== 3}
            depth={depth}
          />
          {item?.children?.length > 0 &&
            onRender(item?.children, depth + 1, show)}
          {item?.children?.length === 0 && depth !== 3 && (
            <CardLayer
              key={`${depth}-${item?.fieldName}`}
              label={DATA_EMPTY}
              show={show}
              depth={depth}
            />
          )}
        </div>
      );
    });
  };

  return (
    <>
      {onDomRender(cards, 1, [])}
      <div
        className={classnames(styles.dragEle, {
          [styles.container]: 1,
        })}
        // style={getItemStyles(currentOffset)}
      >
        <CardLayer
          key={cards[2]?.fieldName}
          label={cards[2]?.label}
          show={true}
          noBorder={cards[2]?.children?.length === 0}
          depth={1}
        />
        {cards[2]?.children?.length > 0 &&
          onRender(cards[2]?.children, 2, true)}
        {cards[2]?.children?.length === 0 && (
          <CardLayer
            key={`${1}-${cards[2]?.fieldName}`}
            label={DATA_EMPTY}
            show={true}
            depth={1}
          />
        )}
      </div>
    </>
  );
};
