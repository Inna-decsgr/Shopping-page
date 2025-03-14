import React from 'react';
import useLike from '../hooks/useLike';
import LikeCard from '../components/LikeCard';

export default function Like() {
  const {likeQuery:{data:products}} = useLike();


  return (
    <div>
      <p className='text-center text-2xl mt-[120px] mb-[60px]'>WISH LIST</p>
      {products && products.length > 0 ? (
        <>
          <ul className='w-[600px] mx-auto'>
            {products.map(product => <LikeCard key={product.id} product={product} />)}
          </ul>
          <div className='text-center mt-[60px]'>
            <div className='text-sm pb-3'>
              <button className='py-2 w-[290px] border-2 border-gray-500 rounded-3xl mr-3'>삭제하기</button>
              <button className='py-2 w-[290px] border-2 border-gray-500 rounded-3xl'>관심상품 비우기</button>
            </div>
            <button className='py-2 w-[600px] border-2 border-gray-500 rounded-3xl text-sm'>장바구니 담기</button>
          </div>
        </>
      ) : (
        <div className='text-center text-gray-500'>위시리스트가 비어있습니다.</div>
      )}
    </div>
  );
}

