import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import Button from '../components/ui/Button';
import useCarts from '../hooks/useCart';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import useLike from '../hooks/useLike';
import { useAuthContext } from '../context/AuthContext';


export default function ProductDetail() {
  const {user} = useAuthContext();
  const {addOrUpdateItem} = useCarts();
  const {addItemToLike} = useLike();
  const {state: {product: {id, title, image, category, price, description, options}}}
  = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const [success, setSuccess] = useState();
  const [like, setLike] = useState();
  const [heart, setHeart] = useState(false);
  
  const handleChange = (e) => {
    setSelected(e.target.value)
  }
  const handleClick = () => {
    const product = {id, image, title, price, option:selected, quantity:1};
    (user ? 
      addOrUpdateItem.mutate(product, {
      onSuccess:() => {
        setSuccess('장바구니에 추가되었습니다.')
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    }) : alert("로그인 후 이용해주세요."));
  };

  const handleaddLike =() => {
    const product = {id, image, title, price, category, description, options};
    (user ?
      addItemToLike.mutate(product, {
        onSuccess:() => {
          setLike('찜한 상품에 추가했어요')
          setHeart(true)
          setTimeout(() => {
            setLike(null)
          }, 3000);
        }
      }) : alert("로그인 후 이용해주세요."));
  }

  
  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img className='w-full px-4 basis-7/12' src={image} alt={title} />
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>       
          <div className='border-b border-gray-400 flex justify-between items-center'>
            <p className='text-2xl font-bold py-2 '>{`₩${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
            {!heart && <FaRegHeart className='text-xl mr-6 cursor-pointer' onClick={handleaddLike}/>}
            {heart && <FaHeart className='text-xl mr-6 cursor-pointer' onClick={handleaddLike}/>}
          </div>
          <p className='py-4 text-lg'>{description}</p>
          <div className='flex items-center'>
            <label htmlFor="select" className='text-brand font-bold'>옵션:</label>
            <select id="select" className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' value={selected} onChange={handleChange}>
              {options && options.map((option, index) => <option key={index}>{option}</option>)}
            </select>
          </div>
          {success && <p className='my-2'>✅{success}</p>}
          {like && <p className='my-2'>💘{like}</p>}
          <Button text="장바구니에 추가" onClick={handleClick}/>
        </div>
      </section>
    </>
  );
}

