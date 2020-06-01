/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import {css, jsx} from '@emotion/core';
import KanbanColumn from './KanbanColumn';
import Modal from './Modal';
import Filter from './Filter';
import { getItems, saveItems } from '../persistence';


const initColumns = [{
  title: 'To-Do',
  id: 'toDo'
},
{
  title: 'In Progress',
  id: 'inProgress'
},
{
  title: 'Done',
  id: 'done'
},
]

export function Board() {
  const [columns, setColumns] = useState(initColumns);
  const [items, setItems] = useState();
  const [isModalVisible, setModalVisible] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const items = getItems();
    const newColumns = columns.map(columnn => ({...columnn, items: items[columnn.id]}));

    setColumns(newColumns);
    setItems(items);
  }, []);

  const sendSaveRequest = (newItems) => {
    const response = saveItems(newItems);
    const newColumns = columns.map(columnn => ({...columnn, items: response[columnn.id]}));
  
    setColumns(newColumns)
    setItems(response);
  }

  const showModal = () => {
    setModalVisible(true);
  }

  const handleCardClick = (item) => {
    setData(item);
    setModalVisible(true);
  }

  const handleModalOk = (item, isNewIssue) => {
    let newItems = {...items};
    const {status} = item;

    if(isNewIssue) {
      newItems[status].push(item);
    } else {
      newItems[status] = newItems[status].map(element => element.id === item.id ? item : element);
    }

    sendSaveRequest(newItems);
    setModalVisible(false);
    setData(null);
  };

  const onClickDelete = (item) => {
    let newItems = {...items};;
    const {status} = item;

    newItems[status] = newItems[status].filter(element => element.id !== item.id);
        
    sendSaveRequest(newItems);
  }

  const handleModalCancel = () => {
      setModalVisible(false);
      setData(null);
  }

  const updateStatus = (newStatus, item) => {
    let newItems = {...items};
    const {status: oldStatus} = item;

    newItems[oldStatus] = newItems[oldStatus].filter(element => element.id !== item.id)

    item.status = newStatus;
    newItems[newStatus].push(item);
        
    sendSaveRequest(newItems);
  };

  const handleFilterChange = (filter) => {
    const response = getItems(filter);

    const newColumns = columns.map(columnn => ({...columnn, items: response[columnn.id]}));

    setColumns(newColumns);
  }

  return (
    <React.Fragment>
      {isModalVisible && <Modal onOk={handleModalOk} onCancel={handleModalCancel} data={data}/>}
      <Button onClick={showModal}>New</Button>
      <Filter handleChange={handleFilterChange}/>
      <div 
        css={css`
              display: flex;
              justify-content: space-around;
        `}>
        {columns.map((column) => <KanbanColumn 
                                    key={column.id} 
                                    {...column} 
                                    onDrop={updateStatus.bind(null, column.id)} 
                                    onCardClick={handleCardClick} 
                                    onClickDelete={onClickDelete} 
                                  />)}
      </div>
    </React.Fragment>
  )
}
