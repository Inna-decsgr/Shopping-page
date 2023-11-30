import React from 'react';
import {useParams} from 'react-router-dom';
import useProduct from '../hooks/useProducts';
import SearchCard from '../components/SearchCard';

export default function Search() {
  const {keyword} = useParams();
  const {productsQuery:{data:products}} = useProduct();
  const items = products && products.filter(product => product.title.includes(keyword));
  console.log(items);

  return (
    <>
      <p className='my-6 text-xl font-bold ml-10'>'{keyword}' 로 검색한 결과</p>
      { items?.length === 0 && 
        <div className='text-lg text-center mt-20 text-gray-500'>
          <p>판매중인 상품이 없습니다.</p>
          <p>검색어를 변경해 보세요.</p>
        </div>
      }
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
        { items && items.map(item => <SearchCard key={item.id} item={item} products={products}/>)}
      </ul>
    </>
  );
}

