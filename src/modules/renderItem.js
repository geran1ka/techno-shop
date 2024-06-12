import Swiper from "swiper";
import { API_URL } from "./const";
import { Scrollbar, Thumbs } from "swiper/modules";

const createCardImageSlider = (largeImages) => {
  const cardImageSlider = document.createElement("ul");
  cardImageSlider.className = "swiper-wrapper";

  const cardImageSlides = largeImages.map((url) => {
    const li = document.createElement("li");
    li.className = "swiper-slide";

    const img = new Image();
    img.src = `${API_URL}${url}`;

    li.append(img);
    return li;
  });

  cardImageSlider.append(...cardImageSlides);

  return cardImageSlider;
};

const createCardImageSliderThumb = (smallImages) => {
  const cardImageSlider = document.createElement("ul");
  cardImageSlider.className = "swiper-wrapper";

  const cardImageSlides = smallImages.map((url) => {
    const li = document.createElement("li");
    li.className = "swiper-slide";

    const btn = document.createElement("button");
    btn.className = "card__thumb-btn";

    const img = new Image();
    img.src = `${API_URL}${url}`;

    btn.append(img);

    li.append(btn);
    return li;
  });

  cardImageSlider.append(...cardImageSlides);

  return cardImageSlider;
};

const createParams = (params) => {
  const list = [];

  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const li = document.createElement("li");
      li.className = "card__params-item";
      li.innerHTML = `
        <span>${key}</span>
        <span>${params[key]}</span>
      `;

      list.push(li);
    }
  }
  console.log(...list);

  return list;
};

const createDescriptionText = (descriptions) => {
  console.log("descriptions: ", descriptions);
  const list = [];
  for (const description of descriptions) {
    const p = document.createElement("p");
    p.innerHTML = description;

    list.push(p);
  }

  return list;
};

export const renderItem = ({
  category,
  categoryRus,
  characteristic,
  color,
  description,
  display,
  id,
  images,
  price,
  title,
}) => {
  const cardSlider = document.querySelector(".card__image");
  cardSlider.append(createCardImageSlider(images.large));
  const cardSliderThumb = document.querySelector(".card__slider-thumb");
  const swiperScrollBar = document.createElement("div");
  swiperScrollBar.className = "swiper-scrollbar";
  cardSliderThumb.append(
    createCardImageSliderThumb(images.small),
    swiperScrollBar
  );

  const cardTitle = document.querySelector(".card__title");
  cardTitle.textContent = title;

  const cardVendorCode = document.querySelector(".card__vendor-code");
  cardVendorCode.textContent = `Артикул: ${id}`;

  const cardPrice = document.querySelector(".card__price");
  cardPrice.textContent = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

  const cardAddCart = document.querySelector(".card__add-cart");
  cardAddCart.dataset.idGoods = id;

  const cardParamsList = document.querySelector(".card__params-list");
  cardParamsList.append(...createParams(characteristic));

  const cardDescription = document.querySelector(".card__description-text");
  cardDescription.append(...createDescriptionText(description));

  const thumbSwiper = new Swiper(cardSliderThumb, {
    spaceBetween: 44,
    slidesPerView: 3,
    scrollbar: {
      el: swiperScrollBar,
      draggable: true,
    },
    modules: [Scrollbar],
  });

  new Swiper(cardSlider, {
    spaceBetween: 10,
    slidesPerView: 1,
    thumbs: {
      swiper: thumbSwiper,
      slideThumbActiveClass: ".card__thumb-btn_active",
    },
    modules: [Thumbs],
  });
};
{
  /* <div class="card__info">
              <h2 class="card__title">Спортивные часы Garmin Venu</h2>

              <p class="card__vendor-code">Артикул: 654651968</p>

              <div class="card__control">
                <div class="card__count">
                  <button class="card__btn card__btn_decrement">–</button>
                  <output class="card__number">1</output>
                  <button class="card__btn card__btn_increment">+</button>
                </div>

                <p class="card__price">21 990 ₽</p>

                <button class="card__add-cart">В корзину</button>
              </div>

              <ul class="card__params-list">
                <li class="card__params-item">
                  <span>Производитель:</span>
                  <span>Garmin</span>
                </li> */
}
