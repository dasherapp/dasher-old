import React from 'react';
import AccountMenu from './AccountMenu';

const BoardPage = ({ match }) => (
  <div>
    <AccountMenu />
    <h1>Board</h1>
    <p>Id: {match.params.id}</p>
  </div>
);

export default BoardPage;
