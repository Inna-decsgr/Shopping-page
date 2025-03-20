import React from 'react';
import ProductCard from './ProductCard';
import useProduct from '../hooks/useProducts';

export default function Products() {
  const {productsQuery:{isLoading, error, data:products}} = useProduct();

  return (
    <div className='mt-[120px]'>
      {isLoading && <section className='px-4 mt-10 text-center text-xl font-bold'>
        <p>로딩중..</p>
        <p>이 작업은 최대 1분까지 소요될 수 있어요.</p>
      </section>}
      {error && <p>{error}</p>}
      {products && <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4 w-[1200px] mx-auto'>
        {products && products.map(product => <ProductCard key={product.id} product={product}/>)}  
      </ul>}
    </div>
  );
}

