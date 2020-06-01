import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default function Filter({handleChange}) {
  return(
    <Search
      placeholder="input search text"
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  )
}
