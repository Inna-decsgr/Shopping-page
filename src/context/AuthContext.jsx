import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [user, setUser] = useState(() => {
    return readUserFromLocalStorage();
  });

  useEffect(() => {
    onUserStateChange(setUser);
    localStorage.setItem('user', JSON.stringify(user))
  },[user])

  return (
    <AuthContext.Provider value={{user, uid: user && user.uid, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function readUserFromLocalStorage() {
  const userInfo = localStorage.getItem('user');
  return userInfo ? JSON.parse(userInfo) : null;
}

export function useAuthContext() {
  return useContext(AuthContext);
}