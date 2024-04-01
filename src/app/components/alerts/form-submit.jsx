import React from 'react';

const FormSubmit = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 bg-transparent text-2xl">&times;</button>
      </div>
    </div>
  );
};

export default FormSubmit;
