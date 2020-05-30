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
  const [items, setItems] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);

  const showModal = () => {
    setModalVisible(true);
  }

  const handleCardClick = (item) => {
    setData(item);
    setModalVisible(true);
  }

  const sendSaveRequest = (newItems) => {
    const response = saveItems(newItems);

    const newColumns = columns.map(columnn => ({...columnn, items: response[columnn.id]}));
    
    setItems(response);
    setColumns(newColumns);
  }

  const handleModalOk = (item, isNewIssue) => {
    let newItems = items;
    const status = item.status;

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
    let newItems = items;
    const status = item.status;

    newItems[status] = newItems[status].filter(element => element.id !== item.id);
        
    sendSaveRequest(newItems);
  }

  const handleModalCancel = () => {
      setModalVisible(false);
      setData(null);
  }

  const updateStatus = (newStatus, item) => {
    let newItems = items;
    const oldStatus = item.status;

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

  useEffect(() => {
      const items = getItems();
      sendSaveRequest(items);
  }, [])

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
