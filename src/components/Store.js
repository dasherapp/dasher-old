import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'

const store = createStore(reducer)

const Store = props => <Provider store={store} {...props} />

export default Store
