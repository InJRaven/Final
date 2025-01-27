import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./banner.scss";
import { Autoplay, Pagination } from "swiper/modules";
const Banner = ({ banners }) => {
  return (
    <section className="w-full aspect-video relative banner">
      <div className="slide-show w-full h-full">
        {banners && banners.length > 0 && (
          <Swiper
            spaceBetween={0} // Space between slides
            slidesPerView={1} // Show one slide at a time
            loop={true} // Infinite loop
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay every 3 seconds
            pagination={{ clickable: true }} // Enable clickable pagination
            modules={[Autoplay, Pagination]} // Import necessary modules
            className="swiper-container"
          >
            {banners.map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  src={item.image_path}
                  alt={`Slide ${item.id}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Banner;
