import React from 'react';
import useLike from '../hooks/useLike';
import LikeCard from '../components/LikeCard';
import { GiHanger } from "react-icons/gi";

export default function Like() {
  const {likeQuery:{data:products}} = useLike();


  return (
    <>
      <GiHanger className='text-9xl w-full my-10'/>
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6'>
      {
        products && products.map(product => <LikeCard key={product.id} product={product}/>)
      }
      </ul>
    </>
  );
}

