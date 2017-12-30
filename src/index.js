import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import App from './components/App'

const rootElement = '#root'

Modal.setAppElement(rootElement)
ReactDOM.render(<App />, document.querySelector(rootElement))
