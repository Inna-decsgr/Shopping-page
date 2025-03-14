import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Button from '../components/ui/Button';
import useCarts from '../hooks/useCart';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import useLike from '../hooks/useLike';
import { useAuthContext } from '../context/AuthContext';


export default function ProductDetail() {
  const {user} = useAuthContext();
  const {addOrUpdateItem} = useCarts();
  const {addItemToLike, removeItemFromLike} = useLike();
  const {state: {product: {id, title, image, category, price, description, options}}}
    = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(options && options[0]);
  const [heart, setHeart] = useState(() => {
    return JSON.parse(localStorage.getItem(`like-${id}`)) || false;
  });

  useEffect(() => {
    localStorage.setItem(`like-${id}`, JSON.stringify(heart));
  }, [heart, id]);
  
  const handleChange = (e) => {
    setSelected(e.target.value)
  }
  const handleClick = () => {
    const product = {id, image, title, price, option:selected, quantity:1};
    (user ? 
      addOrUpdateItem.mutate(product, {
      onSuccess:() => {
        navigate(`/carts`)
      }
    }) : alert("로그인 후 이용해주세요."));
  };

  const handleToggleLike = () => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (heart) {
      // 하트가 채워진 상태 → 찜 제거
      removeItemFromLike.mutate(id, {
        onSuccess: () => {
          setHeart(false);
          alert('관심상품이 삭제되었습니다.')
        }
      });
    } else {
      // 빈 하트 상태 → 찜 추가
      const product = { id, image, title, price, category, description, options };
      addItemToLike.mutate(product, {
        onSuccess: () => {
          setHeart(true);
          alert('선택하신 상품을 관심상품에 담았습니다.')
        }
      });
    }
  }

  
  return (
    <div className='mt-[120px]'>
      <section className='flex flex-col md:flex-row items-center justify-center'>
        <img className='w-[350px]' src={image} alt={title} />
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <p className='text-lg'>{title}</p>
          <p className='text-sm text-gray-500'>{category}</p>
          <div className='border-b border-gray-400 flex justify-between items-center py-4'>
            <p className='text-xl font-bold py-2'>{`${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
            {!heart && <FaRegHeart className='text-xl mr-3 cursor-pointer' onClick={handleToggleLike}/>}
            {heart && <FaHeart className='text-xl mr-3 cursor-pointer' onClick={handleToggleLike}/>}
          </div>
          <p className='pt-4 pb-8'>{description}</p>
          <div className='flex items-center mb-5'>
            <label htmlFor="select" className=''>옵션:</label>
            <select id="select" className='p-2 m-4 flex-1 border-2 border-black rounded-md outline-none' value={selected} onChange={handleChange}>
              {options && options.map((option, index) => <option key={index}>{option}</option>)}
            </select>
          </div>
          <Button text="장바구니에 담기" onClick={handleClick}/>
        </div>
      </section>
    </div>
  );
}

