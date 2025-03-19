import React from 'react';

export default function StoryCard() {
  return (
    <div className='relative mt-[90px]'>
      <img src="image/story01.jpg" alt="슬라이더" />
      <button className='absolute bottom-8 left-[40%] border font-bold py-2 w-[250px] rounded-3xl text-white hover:bg-white hover:text-black transition-all duration-700'>Brand Story</button>
    </div>
  );
}

