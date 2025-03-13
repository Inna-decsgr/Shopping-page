import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { FaPencilAlt, FaHeart } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import Button from './ui/Button';
import CartStatus from './CartStatus';


export default function Navbar() {
  const {user, login, logout} = useAuthContext();
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [search, setSearch] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {  // 키워드 빈 문자열 체크(공백 제거 후)
      alert("검색어를 입력해주세요.");
      return;
    }

    navigate(`/search/${text}`)
    setSearch(false)
  }
  const showSearchBar = (e) => {
    e.preventDefault();
    setSearch(prev => !prev);
  }
  const handleCancel = (e) => {
    setSearch(false)
  }
  useEffect(() => {
    setText(keyword || '') 
  }, [keyword])
  
  return (
    <header>
      <nav className={`fixed top-0 left-0 w-full flex z-[100] bg-white shadow-md items-center justify-between py-6 px-10`}>
        <div className='flex items-center gap-x-6 w-[200px]'>
          <Link to='/products' className="pr-3">SHOP</Link>
          <button onClick={showSearchBar}>SEARCH</button>
        </div>
        <div>
          <Link to='/' className='font-bold text-4xl'>shopsite</Link>
        </div>
        <div className='flex items-center gap-x-4 w-[200px]'>
          {user && <Link to='/products/like'>Like</Link>}
          {user && <Link to='/carts'><CartStatus /></Link>}
          <div className='hidden'>
            {user && <Link to='/products/like'><FaHeart className='text-2xl ml-2'/></Link>}
            {user && user.isAdmin && (
              <Link to='/products/new'>
                <FaPencilAlt className='text-2xl'/>
              </Link>
              )}
            {user && <User user={user}/>}
          </div>
          {!user ? (
            <Button text={"Login"} onClick={login}/>
          ) : (
            <Button text={"Logout"} onClick={logout}/>
          )}
        </div>
      </nav>
      <div className={`fixed top-[89px] left-0 z-50 sm:w-[450px] md:w-[500px] lg:w-[550px] h-screen bg-[#d0deeb] p-[60px] transition-all duration-300 ease-in-out ${search ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`} onClick={(e) => e.stopPropagation()}>
        <button className='absolute top-5 right-5 text-2xl' onClick={handleCancel}>
          <IoIosClose />
        </button>
        <form onSubmit={handleSubmit} className='flex items-center'>
          <IoSearchOutline className="text-lg"/>
          <input
            className='sm:w-[200px] md:w-[250px] lg:w-[300px] h-10 text-sm outline-none bg-transparent ml-5 border-b border-gray-600'
            type="text"
            value={text}
            placeholder='검색어를 입력하세요'
            onChange={handleChange}
          />
        </form>
      </div>
      {search && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={handleCancel}></div>
      )}
    </header>
  );
}

