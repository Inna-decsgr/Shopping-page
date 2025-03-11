import React from 'react';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import useCarts from '../hooks/useCart';

const ICON_CLASS = ' transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1'

export default function CartItem({product, product : {id, image, title, option, quantity, price}}) {
  const { addOrUpdateItem, removeItem } = useCarts();
  const handleMinus = () => {
    if(quantity < 2) return;
    addOrUpdateItem.mutate({...product, quantity: quantity - 1})
  }
  const handlePlus = () => {
    addOrUpdateItem.mutate({...product, quantity: quantity + 1})
  }
  const handleDelete = () => removeItem.mutate(id)

  return (
    <li className='flex justify-between my-2 items-center border-b border-gray-500 p-7'>
      <img className='w-24 md:w-48 rounded-lg' src={image} alt={title} />
      <div className='flex-1 flex justify-between ml-4'>
        <div className='basis-3/5'>
          <p className='font-bold'>{title}</p>
          <p className='text-gray-400 py-4'>옵션: {option}</p>
          <p>{price.toLocaleString()}원</p>
        </div>
        <div className='flex items-center text-lg'>
          <button onClick={handleMinus}>-</button>
          <span className='px-4'>{quantity}</span>
          <button onClick={handlePlus} className='pr-4'>+</button>
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}

