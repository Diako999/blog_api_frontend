import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000); // Auto dismiss after 3s
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded text-white shadow-lg ${
            message.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {message.text}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
