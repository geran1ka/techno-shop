import "./index.html";
import "./card.html";
import "./cart.html";
import "./index.scss";

import Swiper from "swiper";
import { Navigation, Pagination, Thumbs, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { pagination } from "./modules/pagination";

const paginationWrapper = document.querySelector(".pagination");
const pageURL = new URL(location);

const page = +pageURL.searchParams.get("page") || 1;
try {
  pagination({
    wrapper: paginationWrapper,
    pages: 12,
    page: page,
    count: 6,
  });
} catch (error) {
  console.warn("error: ", error);
  console.warn("Это не главная страница");
}

const thumbSwiper = new Swiper(".card__slider-thumb", {
  spaceBetween: 44,
  slidesPerView: 3,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  modules: [Scrollbar, Navigation, Pagination],
});

new Swiper(".card__image", {
  spaceBetween: 10,
  slidesPerView: 1,
  thumbs: {
    swiper: thumbSwiper,
    slideThumbActiveClass: ".card__thumb-btn_active",
  },
  modules: [Thumbs],
});

new Swiper(".recomended__carousel", {
  spaceBetween: 30,
  slidesPerView: 5,
});
