import React from 'react';
import { action } from '@storybook/addon-actions';
import Card from '../../src/components/Card'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'antd/dist/antd.css';
export default {
  title: 'Card',
  component: Card,
};

const item = {
    title: 'Sample title',
    description: 'Sample description',
    tag: 'new tag',
    assignee: 'Assignee',
    dueDate: '1/2/2020'
}

export const BasicDrawableCard = () => <DndProvider backend={HTML5Backend}><Card item={item} onClick={action('clicked')} onClickDelete={action('clicked')}/></DndProvider>