import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function ProductCard({product, product: {id, title, image, price, category}}) {
  const navigate = useNavigate();

  return (
    <li className='rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 shadow-md' onClick={() => {navigate(`/products/${id}`, {state:{product}})}}>
      <img className='w-full' src={image} alt={title} />
      <div className='my-5 text-center'>
        <p className='truncate'>{title}</p>
        <p className='mb-4 text-gray-600'>{category}</p>
        <p className='font-bold text-lg'>{`${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
      </div>
    </li>
  );
}

