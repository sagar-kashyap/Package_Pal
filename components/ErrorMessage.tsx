
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 my-6 rounded-md shadow-lg"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
    