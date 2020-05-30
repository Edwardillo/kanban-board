import React, {ReactDOM} from 'react';

import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';


import Modal from './components/Modal';

const item = {
  title: 'test title',
  description: 'test description',
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

test('on Submit been called once', async () => {
  const { container } = render(<Modal />)
  const name = container.querySelector('input[name="title"]')
  // const email = container.querySelector('input[name="email"]')
  // const color = container.querySelector('input[name="color"]')
  // const submit = container.querySelector('button[type="submit"]')

  console.log(name)

  await wait(() => {
    fireEvent.change(name, {
      target: {
        value: 'mockname'
      }
    })
  })
})
