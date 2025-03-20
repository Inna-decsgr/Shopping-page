import React from 'react';

export default function Button({text, onClick}) {
  return (
    <button className='border py-2 px-5 border-gray-500 rounded-3xl' onClick={onClick}>
      {text}
    </button>
  );
}

