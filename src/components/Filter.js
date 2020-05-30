import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default function Filter(props) {
  const handleChange = (e) => {
    props.handleChange(e.currentTarget.value)
  }

  return(
    <Search
      placeholder="input search text"
      onChange={handleChange}
    />
  )
}