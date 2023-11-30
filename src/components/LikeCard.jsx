import React  from 'react';
import { FaHeart } from "react-icons/fa";
import useLike from '../hooks/useLike';
import {useNavigate} from 'react-router-dom';

export default function LikeCard({product, product:{id, title, image, price}}) {
  const {removeItemFromLike} = useLike();
  const navigate = useNavigate();
  const handleremoveLike =() => {
    removeItemFromLike.mutate(id)
  }


  return (
    <>
      <li className='rounded-lg cursor-pointer overflow-hidden transition-all hover:scale-105'>
        <div className='bg-brand text-white'>
          <img className='w-full' src={image} alt={title} onClick={() => {navigate(`/products/${id}`, {state:{product}})}}/>
          <div className='px-4 py-2'>
            <p className='truncate mt-2'>{title}</p>
            <div className='flex justify-between items-center'>
              <p className='font-bold my-2'>₩{price}</p>
              <FaHeart className='text-lg mr-2 cursor-pointer' onClick={handleremoveLike}/>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

