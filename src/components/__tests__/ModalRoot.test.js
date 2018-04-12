import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'unstated'

import ModalContainer from '../../containers/ModalContainer'
import ModalRoot from '../ModalRoot'

test('renders nothing when modal component is unset', () => {
  const modal = new ModalContainer()

  const tree = renderer
    .create(
      <Provider inject={[modal]}>
        <ModalRoot />
      </Provider>,
    )
    .toJSON()

  expect(modal.state.component).toBeNull()
  expect(modal.state.props).toEqual({})
  expect(tree).toMatchSnapshot()
})

test('renders modal component after showModal() is called', () => {
  const modal = new ModalContainer()
  const ExampleComponent = props => <div {...props} />
  const exampleProps = { foo: 'bar', baz: 42, children: 'Example' }

  modal.showModal(ExampleComponent, exampleProps)

  const tree = renderer
    .create(
      <Provider inject={[modal]}>
        <ModalRoot />
      </Provider>,
    )
    .toJSON()

  expect(modal.state.component).toBe(ExampleComponent)
  expect(modal.state.props).toBe(exampleProps)
  expect(tree).toMatchSnapshot()
})
