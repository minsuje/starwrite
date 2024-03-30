// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './mainPageSilder.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export function MainPageSlider({ contentImg = [] }) {
  // const onAutoplayTimeLeft = (s, time, progress) => {
  //   progressCircle.current.style.setProperty('--progress', 1 - progress);
  //   progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  // };
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {contentImg.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <img src={imgSrc} alt="콘텐츠 이미지" style={{ width: '70%', height: '100%' }} />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>img</SwiperSlide>
        <SwiperSlide>img</SwiperSlide> */}
      </Swiper>
    </>
  );
}
