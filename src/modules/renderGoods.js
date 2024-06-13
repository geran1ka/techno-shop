import { API_URL } from "./const";

export const renderGoods = (wrapper, goods) => {
  wrapper.textContent = "";

  if (!goods.length) {
    wrapper.innerHTML = `
      <h2 class="goods__empty">Нет товаров по вашему запросу</h2>
    `;
  }

  const cards = goods.map(({ id, title, images, price }) => {
    const li = document.createElement("li");
    li.className = "goods__item";

    li.innerHTML = `
      <article class="goods__card goods-item">
        <a class="goods-item__link" href="card.html?id=${id}">
          <img
            class="goods-item__img"
            src="${API_URL}${images.present}"
            alt="${title}"
            width="340"
            height="340"
          />

            <h3 class="goods-item__title">${title}</h3>
        </a>

        <div class="goods-item__wrapper">
          <p class="goods-item__price">${price} ₽</p>

          <button class="goods-item__btn-ad-cart" type="button" data-id-goods="${id}">
            В корзину
          </button>
        </div>
      </article>
    `;
    return li;
  });

  wrapper.append(...cards);
};
