import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, set, remove} from "firebase/database";
import {v4 as uuid} from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);  
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app); 

provider.setCustomParameters({
  prompt: "select_account",
});

export function login(){
  return signInWithPopup(auth, provider)
  .catch(console.error);
}

export function logout(){
  return signOut(auth)
  .catch(console.error);
}

let previousUser = null; // 함수 밖에서 유지하여 상태 기억

export async function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (JSON.stringify(user) === JSON.stringify(previousUser)) return; // 같은 상태면 업데이트 X
    previousUser = user; // 현재 사용자 상태 업데이트

    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);

    console.log('사용자 상태 변경:', user); // 정상 작동 확인
  });
}


export async function adminUser(user) { 
  return get(ref(database, 'admins'))  
  .then(snapshot => {
    if(snapshot.exists()){
      const admins = snapshot.val() 
      const isAdmin = admins.includes(user.uid); 
      return {...user, isAdmin: isAdmin};
    }
    return user;  
  })
}

export async function addNewProduct(product, imageUrl) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    image: imageUrl,
    price: parseInt(product.price),
    options: product.options.split(',')
  })
}

export async function getProducts() {
  return get(ref(database, 'products'))
  .then(snapshot => {
    if(snapshot.exists()){
      return Object.values(snapshot.val())
    }
    return []; 
  })
}

export async function getCarts(userId) { 
  return get(ref(database, `carts/${userId}`))
  .then(snapshot => {
    const items = snapshot.val() || {}
    return Object.values(items);
  })
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product)
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`))
}

export async function getLikes(userId) {
  return get(ref(database, `likes/${userId}`))
  .then(snapshot => {
    const items = snapshot.val() || {}
    return Object.values(items)
  })
}

export async function addToLike(userId, product) {
  return set(ref(database, `likes/${userId}/${product.id}`), product)
}

export async function removeFromLike(userId, productId) {
  return remove(ref(database, `likes/${userId}/${productId}`))
}