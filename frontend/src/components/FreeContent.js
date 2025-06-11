import React from 'react';
import { useParams } from 'react-router-dom';

const FreeContent = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Free Content for Course {id}</h1>
      <p>This is the free content for the course.</p>
    </div>
  );
};

export default FreeContent;
