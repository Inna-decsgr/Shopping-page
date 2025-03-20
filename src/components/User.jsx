import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


export default function User({ user: { photoURL, displayName } }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  if (user?.isAdmin && !isAdmin) {
    setIsAdmin(true);
    console.log('사용자', user?.providerData[0].displayName);
  }
  }, [user, isAdmin]); // isAdmin을 의존성 배열에 추가하여 중복 실행 방지

  return (
    <div className='flex flex-col items-center shrink-0 w-[70px]'>
      {/*<img className='w-10 h-10 rounded-full' src={photoURL} alt={displayName} />*/}
      <button className='hidden md:block' onClick={() => { navigate(`/products/new`) }}>{`${user?.providerData[0].displayName}님`} </button>
    </div>
  );
}

