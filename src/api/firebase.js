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

const app = initializeApp(firebaseConfig);  //firebase 초기화
const provider = new GoogleAuthProvider();// 앱이 초기화가 되면 getAuth로 auth 가져오기
const auth = getAuth();
const database = getDatabase(app); // 초기화

export function login(){
  return signInWithPopup(auth, provider)
  .catch(console.error);
}

export function logout(){
  return signOut(auth)
  .catch(console.error);
}

export async function onUserStateChange(callback) {
    // adminUser는 비동기함수라서 async 붙여주기
    // login, logout한 결과값은 onUserStateChange 함수로 들으면 된다
    // onAuthStateChanged 메소드에 두번째 파라미터로 콜백함수를 전달하면 그 콜백함수가 옵저버 함수가 되어서 authentication state가 변할 때마다 호출되도록 내부적으로 구현이 되어있다. 그래서 따로 login이나 logout 함수에서 then setUser로 user의 상태를 바꿔줄 필요가 없다.
    // onAuthStateChanged() 메서드 자체가 Firebase 인증 상태에 대한 변경을 감지하고 로그인된 경우 인증된 사용자 객체(user)를 반환해주기때문에 따로 user의 상태를 return해주지 않아도 된다.
    //onAuthStateChanged가 로그인 상태를 확인해 user객체 또는 null값을 가져옴
    //확인된 user객체 또는 null값을 callback함수인 (user) => setUser(user)의 인자에 전달
    //setUser(user)에 user객체 또는 null값이 대입됨
    // user라는 상태가 변경되는 이벤트가 발생할때마다 callback함수를 호출

     // 1. 사용자가 있는 경우에(로그인한 경우)
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
     // 로그인을 했다면 adminUser를 통해서 update된 user 정보를 받아올때까지 기다렸다가 updatedUser에 할당해주고 사용자가 없는 경우 null을 할당해준다
    callback(updatedUser);// callback에 update된 user를 전달해주면 된다
  });
}

export async function adminUser(user) { //네트워크 통신을 하니까 비동기 async
    // 2. 사용자가 어드민 권한을 가지고 있는지 확인
    // 3. {...user, isAdmin:true/false}
  return get(ref(database, 'admins'))  // 가지고 오고자하는 데이터(초기화한 데이터베이스와 관심있는 키인 admins) 레퍼런스를 정한 후 get
  .then(snapshot => {// snapshot이 then으로 전달이 무사히 된다면
    if(snapshot.exists()){// snapshot이 있다면(무사히 가지고 온 데이터가 존재한다면)
      const admins = snapshot.val() // snapshot의 val이라는 함수를 호출해서 value를 읽어오면 된다
      const isAdmin = admins.includes(user.uid); // 받아온 admins라는 배열안에 사용자의 uid가 있다면 isAdmin를 true로 설정하고
      return {...user, isAdmin: isAdmin};// 기존 데이터는 그대로 두고 isAdmin을 추가해준다
    }
    return user;  // admin이라는 데이터가 존재하지 않거나 네트워크를 잘 받아오지 못하는 경우 user정보를 반환해준다. 그러면 isAdmin 정보가 없기 때문에 admin이 아닌걸로 간주된다.
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