import React from 'react';

const BoardPage = ({ match }) => (
  <div>
    <h1>Board</h1>
    <p>Id: {match.params.id}</p>
  </div>
);

export default BoardPage;
