import React from 'react';
import ProductSlider from './ProductSlider';
import InfoCard from './InfoCard';
import StoreCard from './StoryCard';
import BottomCard from './BottomCard';

export default function MainHome() {
  return (
    <div>
      {/** 상품 슬라이더 */}
      <ProductSlider />
      {/** 정보 카드 2개 */}
      <InfoCard />
      {/** 브랜드 스토리 1개 */}
      <StoreCard />
      {/** Enjoy your Life 카드 */}
      <BottomCard />
    </div>
  );
}

