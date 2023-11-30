import React from 'react';

export default function Banner() {
  return (
    <section className='h-96 bg-yellow-900 relative'>
      <div className='w-full h-full bg-cover bg-banner opacity-80'></div>
      <div className='absolute w-full top-20 left-48 text-gray-50'>
        <h2 className='text-6xl font-bold'>ORIGINALS</h2>
        <p className='text-xl mt-4 px-2'>We Gave The World an ORIGINAL</p>
        <p className='text-xl px-2'>You Gave us a Thousand Back</p>
      </div>
    </section>
  );
}

