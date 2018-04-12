import React from 'react'

import ModalContainer from '../ModalContainer'

test('initializes modal component and props', () => {
  const modal = new ModalContainer()

  expect(modal.state.component).toBeNull()
  expect(modal.state.props).toEqual({})
})

test('showModal() updates modal component and props', () => {
  const modal = new ModalContainer()
  const ExampleComponent = () => <div>Example</div>
  const exampleProps = { foo: 'bar', baz: 42 }

  modal.showModal(ExampleComponent, exampleProps)

  expect(modal.state.component).toBe(ExampleComponent)
  expect(modal.state.props).toBe(exampleProps)
})

test('hideModal() resets modal component and props', () => {
  const modal = new ModalContainer()
  const ExampleComponent = () => <div>Example</div>
  const exampleProps = { foo: 'bar', baz: 42 }

  modal.showModal(ExampleComponent, exampleProps)
  modal.hideModal()

  expect(modal.state.component).toBeNull()
  expect(modal.state.props).toEqual({})
})
