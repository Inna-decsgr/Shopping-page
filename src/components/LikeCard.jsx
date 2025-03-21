import React, { useEffect }  from 'react';
import useLike from '../hooks/useLike';
import {useNavigate} from 'react-router-dom';

export default function LikeCard({product, product:{id, title, image, price}}) {
  const {removeItemFromLike} = useLike();
  const navigate = useNavigate();
  const handleremoveLike =() => {
    removeItemFromLike.mutate(id);

    // 2️localStorage에서 `like-${id}` 삭제!
    localStorage.removeItem(`like-${id}`);
    
    console.log(`like-${id} 삭제됨!`);
  }
  useEffect(() => {
    console.log('하트 상태', localStorage.getItem(`like-${id}`));
  }, [id]); // `id`가 바뀔 때만 실행


  return (
    <>
      <li className='cursor-pointer py-6 border-y border-gray-500 mb-3'>
        <div className='flex items-center gap-3 px-5'>
          <img className='w-[150px]' src={image} alt={title} onClick={() => {navigate(`/products/${id}`, {state:{product}})}}/>
          <div className='px-4 py-2'>
            <p className='truncate mt-2'>{title}</p>
            <div>
              <p className='mt-2 mb-5 font-semibold text-sm'>{price.toLocaleString()}원</p>
              <button className='text-xs text-gray-400' onClick={handleremoveLike} >삭제하기</button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

