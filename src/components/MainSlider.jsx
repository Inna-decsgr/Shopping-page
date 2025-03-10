import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

export default function MainSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation  // 화살표 버튼
      pagination={{ clickable: true }} // 페이지네이션 (점)
      autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 슬라이드
    >
      <SwiperSlide><img src="image/slider01.jpg" alt="슬라이드 01" /></SwiperSlide>
      <SwiperSlide><img src="image/slider02.jpg" alt="슬라이드 02" /></SwiperSlide>
      <SwiperSlide><img src="image/slider03.jpg" alt="슬라이드 03" /></SwiperSlide>
    </Swiper>
  );
}
