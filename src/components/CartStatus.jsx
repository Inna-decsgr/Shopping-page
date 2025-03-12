import React from 'react';
import useCarts from '../hooks/useCart';

export default function CartStatus() {
  const {cartQuery:{data:products}} = useCarts();

  return (
    <div className='flex items-center'>
      <span>CART</span>
      <p className='text-sm'>({products && products.length})</p>
    </div>
  );
}

