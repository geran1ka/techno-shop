import "./index.html";
import "./card.html";
import "./cart.html";
import "./index.scss";

import Swiper from "swiper";
import { Navigation, Pagination, Thumbs, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { startPagination } from "./modules/pagination";
import { getGoods, getGoodsItem, getGoodsList } from "./modules/goodsService";
import { renderGoods } from "./modules/renderGoods";
import { renderItem } from "./modules/renderItem";
import { filter } from "./modules/filter";
import { footerCategory } from "./modules/footerCategory";
import {
  cartControl,
  getLocalStorage,
  renderCart,
} from "./modules/cartControl";
import { serviceCounter } from "./modules/counterControl";
import { renderRecommended } from "./modules/renderRecomended";
let pages = 50;

const createPreload = () => {
  const preload = document.createElement("div");
  preload.className = "preload";
  preload.innerHTML = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M116.364 0H128C198.691 0 256 57.3091 256 128C256 198.691 198.691 256 128 256C57.3091 256 0 198.691 0 128V116.364H23.2727V128C23.2727 148.713 29.4149 168.961 40.9225 186.183C52.43 203.406 68.7862 216.829 87.9226 224.755C107.059 232.682 128.116 234.756 148.431 230.715C168.746 226.674 187.407 216.7 202.053 202.053C216.7 187.407 226.674 168.746 230.715 148.431C234.756 128.116 232.682 107.059 224.755 87.9226C216.829 68.7862 203.406 52.43 186.183 40.9225C168.961 29.4149 148.713 23.2727 128 23.2727H116.364V0Z" fill="black"/>
    </svg>
  `;

  return preload;
};

try {
  const goodsList = document.querySelector(".goods__list");
  footerCategory();

  if (goodsList) {
    const paginationWrapper = document.querySelector(".pagination");
    filter(goodsList, paginationWrapper);

    const preload = createPreload();
    goodsList.append(preload);
    getGoods().then(({ goods, pages, page }) => {
      renderGoods(goodsList, goods);
      startPagination({ paginationWrapper, pages, page });
      cartControl({
        wrapper: goodsList,
        classAdd: "goods-item__btn-ad-cart",
        classDelete: "goods-item__btn-ad-cart_remove",
      });
      preload.remove();
    });
  }
} catch (error) {
  console.warn("error: ", error);
}

try {
  const card = document.querySelector(".card");

  if (card) {
    const recommended = document.querySelector(".recomended");
    const pageURL = new URL(location);
    const id = +pageURL.searchParams.get("id");

    const preload = createPreload();
    card.append(preload);
    serviceCounter({
      wrapper: ".card__count",
      number: ".card__number ",
      selectorDecrement: ".card__btn_decrement",
      selectorIncrement: ".card__btn_increment",
    });

    getGoodsItem(id)
      .then((item) => {
        renderItem(item);
        cartControl({
          classAdd: "card__add-cart",
          classCount: "card__number",
        });
        preload.remove();
        return item.category;
      })
      .then((category) => {
        return getGoods({ category });
      })
      .then((data) => {
        renderRecommended(recommended, data, id);
      });
  }
} catch (error) {
  console.warn("error: ", error);
}

try {
  const cart = document.querySelector(".cart");

  if (cart) {
    const cartGoods = getLocalStorage("cart-ts");

    const list = Object.keys(cartGoods);

    if (list.length) {
      const preload = createPreload();

      cart.append(preload);

      getGoodsList(list).then((goods) => {
        renderCart(goods, cartGoods);
        cartControl();
        preload.remove();
      });
    }
  }
} catch (error) {
  console.warn("error: ", error);
}

new Swiper(".recomended__carousel", {
  spaceBetween: 30,
  slidesPerView: 5,
});
