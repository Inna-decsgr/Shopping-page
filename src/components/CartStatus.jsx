import React from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCarts from '../hooks/useCart';

export default function CartStatus() {
  const {cartQuery:{data:products}} = useCarts();

  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl'/>
      <p className='absolute bg-brand w-6 h-6 text-center text-center text-white rounded-full -top-1 -right-2 font-bold'>{products && products.length}</p>
    </div>
  );
}

