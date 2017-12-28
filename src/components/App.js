import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Apollo from './Apollo';
import Store from './Store';
import ModalRoot from './ModalRoot';
import PrivateRoute from './PrivateRoute';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import BoardPage from './BoardPage';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <Apollo>
    <Store>
      <Router>
        <div>
          <ModalRoot />
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route path="/board/:id" component={BoardPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </Store>
  </Apollo>
);

export default App;
