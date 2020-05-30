import React from 'react';
import { action } from '@storybook/addon-actions';
import Modal from '../../src/components/Modal'

export default {
  title: 'Form in modal',
  component: Modal,
};

const item = {
    title: 'Sample title',
    description: 'Sample description',
    tag: 'new tag',
    assignee: 'Assignee',
    dueDate: '1/2/2020'
}

export const New = () => <Modal onOk={action('clicked save')} onCancel={action('clicked cancel')}/>

export const LoadData = () => <Modal data={item} onOk={action('clicked save')} onCancel={action('clicked cancel')}/>