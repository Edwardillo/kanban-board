/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';

export default function KanbanColumn ({items = [], title, onCardClick, onClickDelete, onDrop}) {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: ({card}) => onDrop(card),
  })

  return (
    <div 
      ref={drop}
      css={css`
      background-color: #ececec;
      width: 100%;
      margin-right: 10px;
      margin-left: 10px;
      border:0.5px outset #999;
      -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
      -moz-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
      padding-bottom: 10px;`}
    >
      <div>{title}</div>
      <div css={css`border: 1px solid;`}></div>
      {items.map((item) => <Card item={item} key={item.id} onClick={onCardClick} onClickDelete={onClickDelete}/>)}
    </div>
  )
}
