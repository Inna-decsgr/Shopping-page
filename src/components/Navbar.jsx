import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { FaTshirt, FaPencilAlt, FaHeart } from "react-icons/fa";
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import Button from './ui/Button';
import CartStatus from './CartStatus';

export default function Navbar() {
  const {user, login, logout} = useAuthContext();
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const {keyword} = useParams();

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${text}`)
  }

  useEffect(() => {
    setText(keyword || '') 
  }, [keyword])
  
  return (
    <header className='flex justify-between border-b border-gray-300 p-4'>
      <div className='flex items-center'>
        <Link to='/' className='flex items-center text-4xl text-brand'>
          <FaTshirt />
          <h1 className='ml-2'>Adidos</h1>
        </Link>
        <form onSubmit={handleSubmit}>
          <input className='p-0 ml-5 h-10 pl-5 mt-2 sm:w-54 md:w-72 lg:w-80 rounded-sm' type="text" value={text} placeholder='원하는 상품을 검색해보세요' onChange={handleChange}/>
        </form>
      </div>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        {user && <Link to='/carts'><CartStatus /></Link>}
        {user && <Link to='/products/like'><FaHeart className='text-2xl ml-2'/></Link>}
        {user && user.isAdmin && (
          <Link to='/products/new'>
            <FaPencilAlt className='text-2xl'/>
          </Link>
        )}
        {user && <User user={user}/>}
        {!user && <Button text={"Login"} onClick={login}/>}
        {user && <Button text={"Logout"} onClick={logout}/>}
      </nav>
    </header>
  );
}

