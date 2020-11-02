export const ItemTypes = {
  CARD: 'card',
};

export const DATA_EMPTY = 'empty';

export const ITEMS = [
  {
    id: 1,
    text: 'Write a cool JS library',
    label: '第1个',
    fieldName: 'data-a1',
    children: [
      {
        label: '第二层1',
        fieldName: 'data-b1',
        children: [
          {
            label: '第3层1',
            fieldName: 'data-c1',
            children: [],
          },
          {
            label: '第3层2',
            fieldName: 'data-c2',
            children: [],
          },
        ],
      },
      {
        label: '第2层2',
        fieldName: 'data-b2',
        children: [],
      },
      {
        label: '第2层6',
        fieldName: 'data-b6',
        children: [],
      },
    ],
  },
  {
    id: 2,
    text: 'Make it generic enough',
    label: '第2个',
    fieldName: 'data-a2',
    children: [],
  },
  {
    id: 3,
    text: 'Write README',
    label: '第3个',
    fieldName: 'data-a3',
    children: [
      {
        label: '第2层3',
        fieldName: 'data-b3',
        children: [],
      },
      {
        label: '第2层4',
        fieldName: 'data-b4',
        children: [],
      },
      {
        label: '第2层5',
        fieldName: 'data-b5',
        children: [
          {
            label: '第3层3',
            fieldName: 'data-c3',
            children: [],
          },
          {
            label: '第3层4',
            fieldName: 'data-c4',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    text: 'Create some examples',
    label: '第4个',
    fieldName: 'data-a4',
    children: [],
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it',
    label: '第5个',
    fieldName: 'data-a5',
    children: [],
  },
  {
    id: 6,
    text: '???',
    label: '第6个',
    fieldName: 'data-a6',
    children: [],
  },
  {
    id: 7,
    text: 'PROFIT',
    label: '第7个',
    fieldName: 'data-a7',
    children: [],
  },
];
