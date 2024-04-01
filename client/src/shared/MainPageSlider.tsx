// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './mainPageSilder.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

interface MainPageSliderProps {
  contentImg: string[];
  contentText: string[];
}

export function MainPageSlider({
  contentImg = [],
  contentText = [],
}: MainPageSliderProps) {
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
            <div
              style={{
                // border: '1px solid #ffff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <p>{contentText[index]}</p>

              <img
                src={imgSrc}
                alt="콘텐츠 이미지"
                style={{ width: '50%', height: '510x', paddingTop: '30px' }}
              />
            </div>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>img</SwiperSlide>
        <SwiperSlide>img</SwiperSlide> */}
      </Swiper>
    </>
  );
}
