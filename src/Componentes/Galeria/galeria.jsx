/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import TarjetaVideo from "../Cards/videoCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ContenedorGaleria = styled.div`
  width: 100%;
  background-color: #262626;
  position: relative;

  .swiper {
    padding: 0rem;
    z-index: 0;
  }

  .swiper-wrapper {
    z-index: 0;
    padding: 0.9rem;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ $colorPrimario }) => $colorPrimario} !important;
    z-index: 10;
    top: 50%; 
    transform: translateY(-50%); 
    width: 3rem;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.8); 
    border-radius: 50%; 
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      font-size: 1.5rem; 
    }
  }

  .swiper-button-next {
    right: -1rem; 
  }

  .swiper-button-prev {
    left: -1rem; 
  }

  .swiper-pagination-bullet-active {
    background-color: ${({ $colorPrimario }) => $colorPrimario} !important;
  }
`;

const GaleriaVideos = ({ videos, colorPrimario, cambiarEstado, setVideoSeleccionado }) => {
  return (
    <ContenedorGaleria $colorPrimario={colorPrimario}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <TarjetaVideo video={video} colorPrimario={colorPrimario} 
            cambiarEstado={cambiarEstado} setVideoSeleccionado={setVideoSeleccionado}  />
          </SwiperSlide>
        ))}
      </Swiper>
    </ContenedorGaleria>
  );
};

export default GaleriaVideos;