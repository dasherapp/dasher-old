import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Apollo from './Apollo'
import Store from './Store'
import ModalRoot from './ModalRoot'
import PrivateRoute from './PrivateRoute'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import BoardPage from './BoardPage'
import NotFoundPage from './NotFoundPage'

const App = () => (
  <Apollo>
    <Store>
      <Router>
        <React.Fragment>
          <ModalRoot />
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/board/:id" component={BoardPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </Router>
    </Store>
  </Apollo>
)

export default App
