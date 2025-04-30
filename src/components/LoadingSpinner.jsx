import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-16 h-16 border-8 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;
