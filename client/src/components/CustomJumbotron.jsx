import React from 'react';

const CustomJumbotron = ({ title, body }) => {
  return (
    <div className='customJumbotron'>
      <div className='container py-5 text-center'>
        <h1 className='display-4 fw-bold text-dark-blue mt-5'>{title}</h1>
        <p className='text-light text-dashboard'>{body}</p>
      </div>
    </div>
  );
};

export default CustomJumbotron;
