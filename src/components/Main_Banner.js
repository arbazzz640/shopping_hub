import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';


const Main_Banner = () => {
    // const swiperRef = useRef();
    let img_array = ['clothes_banner.avif', 'shoes_banner.avif', 'watch_banner.avif', 'category_clothes.avif']
    return (
        <>
            <div className="main_banner">
                <Swiper
                    loop={true}
                    modules={[Autoplay, Pagination,]}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    className="mySwiper">
                    {
                        img_array.map((currImg) => {
                            return (
                                <SwiperSlide>
                                    <div className="bannerImg">
                                        <img src={`https://arbazzz640.github.io/banner/${currImg}`} />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div >
        </>
    )
}

export default Main_Banner
