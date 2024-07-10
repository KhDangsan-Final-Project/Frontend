import React from 'react';
import { useParams } from 'react-router-dom';

const SubPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>테스트용</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default SubPage;