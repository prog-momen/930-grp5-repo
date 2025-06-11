import React from 'react';
import { useParams } from 'react-router-dom';

const PaidContent = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Paid Content for Course {id}</h1>
      <p>This is the paid content for the course.</p>
    </div>
  );
};

export default PaidContent;
