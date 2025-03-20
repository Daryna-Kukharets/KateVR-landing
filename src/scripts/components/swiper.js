import Swiper from 'swiper';
import {
  Autoplay,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination.min.css';
import 'swiper/modules/navigation.min.css';
import 'swiper/modules/scrollbar.min.css';

export const aboutSlider = () => {
  const slider = new Swiper('.slider', {
    modules: [Navigation, Pagination, Scrollbar],
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 5,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next-out',
      prevEl: '.swiper-button-prev-out',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    on: {
      init: function () {
        updateSlideCounter(this);
      },
      slideChange: function () {
        updateSlideCounter(this);
      },
    },
  });

  function updateSlideCounter(swiper) {
    const currentIndex = swiper.realIndex + 1;
    const totalSlides = swiper.slides.length;
    const counter = document.querySelector('.swiper-pagination--fraction');
    counter.textContent = `${currentIndex}/${totalSlides}`;
  }
};

export const headerSlider = () => {
  const slider = new Swiper('.header__slider', {
    modules: [Navigation, Scrollbar, Autoplay],
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 5,
    navigation: {
      nextEl: '.swiper-button-next-header',
      prevEl: '.swiper-button-prev-header',
    },
    scrollbar: {
      el: '.swiper-scrollbar-header',
      draggable: true,
    },
    autoplay: {
      delay: 2500,
    },
  });
};
