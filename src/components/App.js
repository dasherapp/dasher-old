import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Apollo from './Apollo';
import PrivateRoute from './PrivateRoute';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import BoardPage from './BoardPage';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <Apollo>
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/board/:id" component={BoardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </Apollo>
);

export default App;
