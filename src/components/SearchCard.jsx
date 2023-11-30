import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function SearchCard({item: {id, title, image, price, category, description, options}}) {
  const navigate = useNavigate();

  return (
    <li className='rounded-lg overflow-hidden cursor-pointer shadow-md' onClick={() => {navigate(`/products/${id}`, {state:{product:{id, title, image, price, category, description, options}}})}}>
      <img className='w-full' src={image} alt={title} />
      <div className='flex justify-between items-center text-lg my-2 px-2'>
        <h3 className='truncate'>{title}</h3>
        <p>₩{price}</p>
      </div>
      <p className='px-2 mb-2'>{category}</p>
    </li>
  );
}

