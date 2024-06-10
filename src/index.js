import "./index.html";
import "./card.html";
import "./cart.html";
import "./index.scss";

import Swiper from "swiper";
import { Navigation, Pagination, Thumbs, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { startPagination } from "./modules/pagination";
import { getGoods } from "./modules/goodsService";
import { renderGoods } from "./modules/renderGoods";
let pages = 50;
try {
  const paginationWrapper = document.querySelector(".pagination");
  const goodsList = document.querySelector(".goods__list");
  const pageURL = new URL(location);

  const page = +pageURL.searchParams.get("page") || 1;

  goodsList.innerHTML = `
    <div class="goods__preload">
      <svg>Загрузка</svg>
    </div>
  `;
  getGoods({ page }).then(({ goods, pages, page }) => {
    renderGoods(goodsList, goods);
    startPagination({ paginationWrapper, pages, page });
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
