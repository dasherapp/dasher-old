import React from 'react';

function BoardPage({ match }) {
  return (
    <div>
      <h1>Board</h1>
      <p>Id: {match.params.id}</p>
    </div>
  );
}

export default BoardPage;
