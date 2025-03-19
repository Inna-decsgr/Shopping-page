import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

export default function ProductSlider() {
  return (
    <div className='mt-[90px] w-[1000px] mx-auto'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        navigation  // 화살표 버튼
        pagination={{ clickable: true }} // 페이지네이션 (점)
        autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 슬라이드
      >
        <SwiperSlide><img src="image/productcard01.jpg" alt="상품 카드 01" className='w-[500px]' /></SwiperSlide>
        <SwiperSlide><img src="image/productcard02.jpg" alt="상품 카드 02" className='w-[500px]' /></SwiperSlide>
        <SwiperSlide><img src="image/productcard03.jpg" alt="상품 카드 03" className='w-[500px]' /></SwiperSlide>
        <SwiperSlide><img src="image/productcard04.jpg" alt="상품 카드 04" className='w-[500px]' /></SwiperSlide>
        <SwiperSlide><img src="image/productcard05.jpg" alt="상품 카드 05" className='w-[500px]' /></SwiperSlide>
        <SwiperSlide><img src="image/productcard06.jpg" alt="상품 카드 06" className='w-[500px] mx-auto' /></SwiperSlide>
      </Swiper>
    </div>
  );
}

