import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function ProductCard({product, product: {id, title, image, price, category}}) {
  const navigate = useNavigate();

  return (
    <li className='rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 shadow-md' onClick={() => {navigate(`/products/${id}`, {state:{product}})}}>
      <img className='w-full' src={image} alt={title} />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`₩${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{category}</p>
    </li>
  );
}

