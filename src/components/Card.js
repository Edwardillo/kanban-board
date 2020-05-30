/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import { useDrag } from 'react-dnd';
import {Popconfirm} from 'antd'
import {ItemTypes} from '../constants'

export default function Card (props) {
  const [, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      card: {...props.item}
      }
  });

  const onClick = () => {
    props.onClick(props.item)
  }

  const onClickDelete = () => {
    props.onClickDelete(props.item)
  }

  const {title, description, tag, assignee, dueDate} = props.item;

  return(
    <div 
      ref={drag} 
      id={props.id} 
      onClick={onClick}
      css={css`
        background: #fff;
        margin: 0 10px;
        margin-top: 10px;
      `}>
        <div
          css={css`
            font-weight: 500;
            font-size: 16px;
            border-bottom: 1px solid #f0f0f0;
            display:flex;
            padding: 0 24px;
          `}>
          <div>
            {title}
          </div>
          <div
            css={css`
            float: right;
            margin-left: auto;
            color: rgba(0,0,0,.65);
            &:hover {
              cursor: pointer;
            }
          `}
            onClick={(e) => e.stopPropagation()}
          >
            <Popconfirm
              title="Are you sure delete this issue?"
              okText="Yes"
              cancelText="No"
              onConfirm={onClickDelete}
            >
            <div>X</div>
            </Popconfirm>
          </div>
        </div>
        <div
          css={css`padding: 24px`}
        >
          <p>{description}</p>
          <p>{assignee}</p>
          <p>{dueDate}</p>
          <p>{tag}</p>
        </div>
      </div>
  )
}
