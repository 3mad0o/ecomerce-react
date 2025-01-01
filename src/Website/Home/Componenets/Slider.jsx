import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Slider = () => {
  return (
    <Swiper
    modules={[ Pagination, Scrollbar, A11y]}
    spaceBetween={10}
    slidesPerView={1.25}
    loop ={true}
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    centeredSlides={true}
    
  >
    <SwiperSlide>
        <div className="slider_item">
        <img src="https://img.freepik.com/free-psd/black-friday-sale-social-media-banner-design-template-with-realistic-balloons-gift-box_47987-16926.jpg?t=st=1735137609~exp=1735141209~hmac=f8f793d51d1e95973b57f4afe297e787abe2ca402c9719a763d8a367566e4d39&w=1380" />

        </div>


    </SwiperSlide>
    <SwiperSlide>
        <div className="slider_item">
        <img src="https://img.freepik.com/free-psd/black-friday-sale-social-media-banner-design-template-with-realistic-balloons-gift-box_47987-16926.jpg?t=st=1735137609~exp=1735141209~hmac=f8f793d51d1e95973b57f4afe297e787abe2ca402c9719a763d8a367566e4d39&w=1380" />

        </div>


    </SwiperSlide>
    <SwiperSlide>
        <div className="slider_item">
        <img src="https://img.freepik.com/free-psd/black-friday-sale-social-media-banner-design-template-with-realistic-balloons-gift-box_47987-16926.jpg?t=st=1735137609~exp=1735141209~hmac=f8f793d51d1e95973b57f4afe297e787abe2ca402c9719a763d8a367566e4d39&w=1380" />

        </div>


    </SwiperSlide>
    <SwiperSlide>
        <div className="slider_item">
        <img src="https://img.freepik.com/free-psd/black-friday-sale-social-media-banner-design-template-with-realistic-balloons-gift-box_47987-16926.jpg?t=st=1735137609~exp=1735141209~hmac=f8f793d51d1e95973b57f4afe297e787abe2ca402c9719a763d8a367566e4d39&w=1380" />

        </div>


    </SwiperSlide>
  </Swiper>
  )
}
