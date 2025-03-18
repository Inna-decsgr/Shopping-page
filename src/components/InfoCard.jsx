import React from 'react';

export default function InfoCard() {
  return (
    <div className='mt-[90px] flex justify-between text-center gap-[30px] w-[1000px] mx-auto'>
      <div>
        <img src="image/InfoCard01.jpg" className='w-[600px]' alt="정보 카드01" />
        <button className='mt-[30px] border py-2 w-[250px] rounded-3xl hover:bg-black hover:text-white transition-all duration-500'>NOTICE</button>
      </div>
      <div>
        <img src="image/InfoCard02.jpg" className='w-[600px]' alt="정보 카드02" />
        <button className='mt-[30px] border py-2 w-[250px] rounded-3xl hover:bg-black hover:text-white transition-all duration-500'>NEW ARRIVAL</button>
      </div>
    </div>
  );
}

