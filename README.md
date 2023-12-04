#### 프로젝트 이름
간단한 쇼핑 사이트

#### 사용 언어
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=javascript&logoColor=black">

#### 구현 사항
* 구글 계정으로 로그인, 로그아웃
* Admin 계정으로 로그인하면 새로운 상품 등록 가능
* 검색 기능 🔍
* 장바구니에 상품 추가 🛒
* 찜한 상품에 추가 💘
* 접근 권한이 있는 사용자만 접근할 수 있도록 경로 보호

 
#### 주요 내용
* Google provider object를 사용해서 구글 로그인 팝업창을 띄우고 사용자에게 구글 계정으로 로그인하도록 요청한 후 사용자가 로그인을 완료하면 firebase로 인증한다.
* firebase datebase에 admins를 등록하고 admins의 key에 user의 uid를 저장해놓으면 해당 uid를 가진 user는 Admin 계정으로 로그인된다.
* 제품 등록하기 버튼을 클릭하면 cloudinary에 이미지가 업로드 되고 성공적으로 업로드를 마치면 이미지의 url을 받아와서 firebase에 url과 함께 product의 다른 정보들도 함께 저장한다.
* `ref` 함수로 firebase에 저장하거나 삭제하고자 하는 데이터를 레퍼런스로 지정한 후 `set`으로 database에 새로운 데이터를 저장하거나, `remove` 함수로 firebase에 저장되어 있는 데이터를 삭제한다. 장바구니나 찜에 담겨있는 상품을 추가하거나 삭제하는 기능 구현할 떄 사용했다.
* 모든 상품들, 검색 키워드와 일치하는 상품들, 장바구니에 담긴 상품들 또는 찜한 상품들과 같이 firebase에 저장된 데이터를 받아와서 보여줄 떄는 `get` 함수로 상품 정보를 가져와서 보여준다.
* 또한 장바구니에 담겨있는 상품들을 product으로 받아온 후 product의 length를 구해서 현재 장바구니에 몇개의 상품이 담겨있는지 뱃지로 사용자에게 보여준다.
* ProtectedRoute를 만들어서 권한이 없는 사용자는 컴포넌트에 접근할 수 없도록 경로를 보호한다. carts나 like는 로그인만 되어있다면 접근이 가능하지만 새로운 제품을 등록하는 Newproducts는 Admin 계정 사용자만 사용할 수 있다. children과 함께 requireAdmin 인자도 함께 받아와서 만약 requireAdmin이 true라면 제품을 등록하는 기능을 쓸 수 있다.
* 접근 권한이 없는 사용자가 해당 기능을 사용하려고 하면 '로그인 후 이용해주세요'라는 알림창이 뜬다.
* `useProducts`, `useCarts`, `useLike`와 같이 커스텀 훅을 만들어서 데이터를 fetching하는 모든 코드들을 UI 컴포넌트 코드들로부터 분리하고, queryKey를 사용하는 곳을 한 군데로 정해서 그 곳에서만 관리, 유지보수 또는 invalidateCache를 할 수 있도록 한다.

#### Admin 계정 제품 등록


#### 문제 해결
* 어떤 상품을 검색하고 나서 이전에 검색했던 상품으로 돌아가려고 이전 버튼을 클릭하면 url의 keyword와 검색창의 검색어가 일치하지 않았고 페이지의 로고를 누르면 루트 경로로 이동하면서 검색어창이 비워져야하는데 이 또한 작동하지 않았다.
  * input의 value를 설정해주지 않아서 생긴 문제였다. input의 value를 text로 설정해주고 keyword가 바뀔 떄마다 useParams로 keyword를 받아와서 text로 저장했다. 만약 keyword가 없다면 text를 빈문자열로 저장하는데 루트 경로는 keyword가 존재하지 않기 때문에 검색창이 비워진다.
* 찜한 상품들중 하나를 클릭하면 해당 상품의 상세 페이지로 이동해야하는데 넘어가지 않고 에러가 떴다.
  * 에러 메시지를 살펴보니 product의 정보가 존재하지 않는다고 나왔다. products에서 상품을 클릭해서 상세페이지로 넘어가는것과 동일하게 useNavigate를 사용해 경로를 이동하는거라서 따로 정보를 주지 않아도 되는 줄 알았는데 아니었나 보다. likeCard에서도 navigate로 경로 이동할 떄 state에 product를 함께 전달해주었다. 상세페이지로 넘어가서 product에 대한 데이터를 다시 fetching 하는 것이 아니라 전달받은 product를 그대로 사용하도록 해주니까 상세 페이지가 정상적으로 잘 나왔다.
* 새로운 제품을 등록하거나 장바구니에 상품이 담고 뺼 때 상품 정보와 장바구니에 담긴 상품 개수가 바로 수정되는 것이 아니라 다른 페이지로 이동했다가 다시 돌아오면 그때 정보가 수정되는 문제가 있었다.
  * tanstack query에서 cache를 해둬서 window가 refocus 되거나 컴포넌트가 다시 mount 될때만 업데이트가 일어나기 때문에 발생한 문제였다. useMutation과 invalidatecache를 사용해서 수정해주었는데 useMutation으로 mutation을 만든 후 변경할 인자를 객체로 받아오고 어떻게 변경할 지는 콜백함수로 전달받았다. mutation이 성공적으로 끝나면 invalidateQueries 해줘서 정보를 최신으로 업데이트 해주었는데 다 업데이트 하는것이 아니라 업데이트 해야하는 항목만 key로 전달해서 해당 key를 가진 cache만 invalidate 하도록 해서 불필요한 정보들의 업데이트를 막았다. 이렇게 해주고 나니 최상위버전으로 업데이트가 필요한 정보들만 즉각적으로 업데이트 되었다.
* nelify로 사이트를 배포한 후 로그인 팝업창이 뜨지 않았다.
  * Firebase authentication에 netlify 도메인을 추가하지 않아서 생긴 에러였다. netlify로 배포하고 생성된 url을 추가해주면 정상적으로 동작한다.

 
#### 배포 링크📌
https://grand-dieffenbachia-b04f24.netlify.app
