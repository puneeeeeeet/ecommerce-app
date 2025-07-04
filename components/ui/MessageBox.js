
"use client";

import React from 'react';

const MessageBox = ({ message, onClose }) => {
  

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in'>
      <div className='bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto transform scale-95 animate-scale-in'>
        <p className='text-lg font-semibold mb-4'>{message}</p>
        <button
          onClick={onClose}
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MessageBox;