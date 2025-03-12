import React from 'react';

export default function PriceCard({text, price}) {
  return (
    <div className='border-y my-3 border-gray-500 w-full py-8'>
      <p className='text-left'>{text}</p>
      <p className='font-bold text-lg text-right'>
        {price === "0원" ? price : `${price}원`}
      </p>
    </div>
  );
}

