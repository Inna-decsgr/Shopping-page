export default function Footer() { 
  return (
    <div className='p-5 mt-[120px]'>
      <div className='flex text-sm justify-between items-center pb-5'>
        <div className='flex gap-4'>
          <p>문의하기</p>
          <p>고객 서비스</p>
          <p>매장 찾기</p>
          <p>법적 고지</p>
          <p className='font-bold'>개인정보 보호정책</p>
          <p>구독하기</p>
          <p>소셜</p>
          <p>국가: <span className='border-b border-gray-500 pb-[2px]'>South Korea</span></p>
        </div>
        <div>
          <p className='font-bold'>2025 SHOP SITE</p>
        </div>
      </div>
      <div className='text-[10px] text-gray-500'>
        <p>(주)샤피사이트 | 대표자명:홍길동 | 사업자번호: 123-45-67890 | 통신판매신고번호: 제 2014-서울-1050호(사업자 정보 확인) | 이메일 문의: <span className='border-b border-gray-500'>shopsite@gmail.com</span> | 개인정보보호책임자: 김철수 | 주소: 서울특별시 마포구 아리랑마당로4길 23 | 대표번호: <span className='border-b border-gray-500'>1500-3926</span></p>
        <p className='font-bold'>고객님의 안전한 현금자산 거래를 위해 한국은행과 채무지급보증계약을 체결하여 보장해드리고 있습니다. <span>서비스 가입사실 확인</span></p>
      </div>
    </div>
  )
}