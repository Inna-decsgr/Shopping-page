import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function SearchCard({item: {id, title, image, price, category, description, options}}) {
  const navigate = useNavigate();

  return (
    <li className='rounded-lg overflow-hidden cursor-pointer shadow-md mb-3' onClick={() => {navigate(`/products/${id}`, {state:{product:{id, title, image, price, category, description, options}}})}}>
      <img className='w-full' src={image} alt={title} />
      <div className='p-3 text-center'>
        <p className='truncate'>{title}</p>
        <p className='pb-3 font-bold'>{price.toLocaleString()}</p>
        <p className='text-sm text-gray-500'>{category}</p>
      </div>
    </li>
  );
}

