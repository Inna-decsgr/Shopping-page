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
    <div className='mt-[120px] p-8'>
      <p className='my-6 text-lg font-bold ml-10'>'{keyword}' 에 대한 검색결과 ({items?.length})</p>
      { items?.length === 0 && 
        <div className='text-lg text-center mt-20 text-gray-500'>
          <div className='text-sm pb-4'>
            <p className='text-[#2996CE] font-bold'>검색결과가 없습니다.</p>
            <p className='font-bold'>정확한 검색어 인지 확인하시고 다시 검색해주세요.</p>
          </div>
          <div className='text-xs leading-5'>
            <p>검색어/제외검색어의 입력이 정확한지 확인해 보세요.</p>
            <p>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</p>
            <p>검색 옵션을 다시 확인해 보세요.</p>
          </div>
        </div>
      }
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
        { items && items.map(item => <SearchCard key={item.id} item={item} products={products}/>)}
      </ul>
    </div>
  );
}

