import React from 'react';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import useCarts from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from '../components/CartStatus';
import Button from '../components/ui/Button';

const SHIPPING = 2500;
const FREE_SHIPPING = 80000;


export default function MyCart() {
  const { cartQuery: { isLoading, data: products } } = useCarts();
  const {user} = useAuthContext();

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
    <section className='p-12 flex flex-col my-[90px]'>
      {user && <Link to='/carts' className="p-3"><CartStatus /></Link>}
      <div className='relative'>
        {!hasProducts && 
          <section className='text-center my-10 text-sm'>
            <p className='mb-4 font-bold text-gray-500'>장바구니가 비어 있습니다.</p>
            <Link to='/products'>
              <Button text="상품 보러 가기"/>
            </Link>
          </section>}
        {hasProducts && <div className='relative flex items-center gap-7'>
          <div className='basis-3/4 p-3 mb-6'>
            <ul className='mb-4 border-t border-gray-500'>
              {products && products.map(product => <CartItem key={product.id} product={product}/>)}
            </ul>
            <div className='border-b border-gray-500 pb-4 text-center'>
              <span>구매금액 <span className='font-bold'>{totalPrice.toLocaleString()}</span></span>
              <span> + 배송비 {totalPrice >= FREE_SHIPPING ? "0 (무료)" : SHIPPING.toLocaleString()} = </span>
              <span className='font-bold'>{(Number(totalPrice) + (totalPrice >= FREE_SHIPPING ? 0 : 2500)).toLocaleString()}원</span>
            </div>
            <p className='text-center text-sm text-gray-500 pt-3'>할인 적용 금액은 주문서 작성의 결제 예정 금액에서 확인 가능합니다.</p>
          </div>
          <div className='basis-1/4'>
            <PriceCard text="배송비" price={totalPrice >= FREE_SHIPPING ? "0원" : SHIPPING}/>
            <PriceCard text="총 상품금액" price={PRICE}/>
            <PriceCard text="TOTAL" price={totalPrice >= FREE_SHIPPING ? PRICE : (totalPrice + SHIPPING).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/>
          </div>
        </div>
        }
        {hasProducts && <button className='absolute left-[30%] w-[300px] border py-2 rounded-3xl border-gray-500 my-6'>전체상품주문</button>}
      </div>
    </section>
  );
}

