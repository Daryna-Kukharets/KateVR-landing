'use strict';
import { changeLang } from './components/changeLang.js';
import { chooseSelect, closeDropdown } from './components/chooseSelect.js';
import { closeOrder } from './components/closeOrder.js';
import { formValidation } from './components/formValidation.js';
import { moveLabel } from './components/moveLabel.js';
import { openFaq } from './components/openFaq.js';
import { playVideo } from './components/playVideo.js';
import { aboutSlider, headerSlider } from './components/swiper.js';
import { toggleList } from './components/toggleList.js';

document.addEventListener('DOMContentLoaded', () => {
  playVideo();
  aboutSlider();
  headerSlider();
  changeLang();
  toggleList();
  openFaq();
  chooseSelect();
  closeDropdown();
  moveLabel();
  formValidation();
  closeOrder();
});
