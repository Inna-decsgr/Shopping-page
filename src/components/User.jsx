import React from 'react';
import {useNavigate} from 'react-router-dom';


export default function User({ user: { photoURL, displayName } }) {
  const navigate = useNavigate();

  return (
    <div className='flex items-center shrink-0 w-[70px]'>
      {/*<img className='w-10 h-10 rounded-full' src={photoURL} alt={displayName} />*/}
      <button className='hidden md:block' onClick={() => { navigate(`/products/new`) }}>{`${displayName}님`}</button>
    </div>
  );
}

