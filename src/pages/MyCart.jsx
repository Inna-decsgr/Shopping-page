import React from 'react';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import {BsFillPlusCircleFill} from 'react-icons/bs'
import {FaEquals} from 'react-icons/fa';
import Button from '../components/ui/Button';
import useCarts from '../hooks/useCart';
import {Link} from 'react-router-dom';

const SHIPPING = 2500;
const FREE_SHIPPING = 80000;


export default function MyCart() {
  const {cartQuery:{isLoading, data:products}} = useCarts();

  if(isLoading) return (<>
    {isLoading && <section className='px-4 mt-10 text-center text-xl font-bold'>
        <p>로딩중..</p>
        <p>이 작업은 최대 1분까지 소요될 수 있어요.</p>
      </section>}
    </>)
  const hasProducts = products && products.length > 0;
  const totalPrice = products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);
  const PRICE = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold p-4 border-b border-gray-300'>내 장바구니</p>
      {!hasProducts && 
        <section className='text-center my-10'>
          <p className='text-2xl my-4'>장바구니에 담긴 상품이 없어요</p>
          <p className='text-xl mb-8'>원하는 상품을 담아보세요</p>
          <Link to='/products'>
            <Button text="상품 보러 가기"/>
          </Link>
        </section>}
      {hasProducts && <>
        <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
          {products && products.map(product => <CartItem key={product.id} product={product}/>)}
        </ul>
        <div className='flex justify-between items-center mb-8 px-2 md:px-8 lg:px-16'>
          <PriceCard text="상품 총액" price={PRICE}/>
          <BsFillPlusCircleFill className='shrink-0 text-2xl'/>
          <PriceCard text="배송비" price={totalPrice >= FREE_SHIPPING ? "무료" : SHIPPING}/>
          <FaEquals className='shrink-0 text-2xl' />
          <PriceCard text="총 가격" price={totalPrice >= FREE_SHIPPING ? PRICE : (totalPrice + SHIPPING).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/>
        </div>
        <p className='text-lg my-4 px-2 font-semibold'>* 80,000원 이상 구매시 배송비 무료입니다. (기본 배송료 2,500원)</p>
        <Button text='주문하기'/>
      </>}
    </section>
  );
}

