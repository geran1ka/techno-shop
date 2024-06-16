import { API_URL } from "./const";
import { serviceCounter } from "./counterControl";

export const getLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key) || "{}");
export const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const addToCart = (id, count = 1) => {
  const cartGoods = getLocalStorage("cart-ts");

  cartGoods[id] = count;

  setLocalStorage("cart-ts", cartGoods);
};

const removeToCart = (id) => {
  const cartGoods = getLocalStorage("cart-ts");

  delete cartGoods[id];

  setLocalStorage("cart-ts", cartGoods);
};

const checkItems = ({ classDelete, classAdd, classCount } = {}) => {
  const cartGoods = getLocalStorage("cart-ts");

  let count = 0;

  for (const cartGoodsKey in cartGoods) {
    if (Object.hasOwnProperty.call(cartGoods, cartGoodsKey)) {
      count += cartGoods[cartGoodsKey];
    }
  }

  const cartElem = document.querySelector(".header__cart");
  cartElem.dataset.count = count;

  if (classDelete) {
    const elems = document.querySelectorAll("[data-id-goods]");

    elems.forEach((elem) => {
      if (cartGoods[elem.dataset.idGoods]) {
        elem.classList.add(classDelete);
        elem.textContent = "В корзине";
      } else {
        elem.classList.remove(classDelete);
        elem.textContent = "В корзину";
      }
    });
  }

  if (classAdd && classCount) {
    const countElem = document.querySelector(`.${classCount}`);
    const addElem = document.querySelector(`.${classAdd}`);

    countElem.value = cartGoods[addElem.dataset.idGoods] || 1;
  }
};

export const cartControl = ({
  wrapper,
  classAdd,
  classDelete,
  classCount,
} = {}) => {
  checkItems({ classDelete, classCount, classAdd });

  if (wrapper && checkItems && classDelete) {
    wrapper.addEventListener("click", (e) => {
      const target = e.target;

      const id = target.dataset.idGoods;

      if (!id) return;

      if (target.closest(`.${classDelete}`)) {
        removeToCart(id);
      } else if (target.closest(`.${classAdd}`)) {
        addToCart(id);
      }

      checkItems({ classDelete });
    });
  } else if (classAdd && classCount) {
    const btn = document.querySelector(`.${classAdd}`);
    const id = btn.dataset.idGoods;

    const countElem = document.querySelector(`.${classCount}`);

    btn.addEventListener("click", () => {
      const count = +countElem.value;

      addToCart(id, count);
      checkItems();
    });
  }
};

export const renderCart = (goods, cartGoods) => {
  const cartGoodsList = document.querySelector(".cart-goods__list");

  cartGoodsList.textContent = "";

  goods.forEach(({ id, images, title, price }) => {
    const li = document.createElement("li");
    li.className = "cart-goods__item item";

    const img = new Image(200, 200);
    img.src = `${API_URL}${images.present}`;
    img.alt = title;

    const detail = document.createElement("div");
    detail.className = "item__detail";

    const itemTitle = document.createElement("h4");
    itemTitle.className = "item__title";
    itemTitle.textContent = title;

    const venderCode = document.createElement("p");
    venderCode.className = "item__vender-code";
    venderCode.textContent = `Артикул: ${id}`;

    detail.append(itemTitle, venderCode);

    const control = document.createElement("div");
    control.className = "item__control";

    const count = document.createElement("div");
    count.className = "item__count";
    count.dataset.idGoods = id;

    const btnDecrement = document.createElement("button");
    btnDecrement.className = "item__btn item__btn_decrement";
    btnDecrement.textContent = "–";
    btnDecrement.type = "button";

    const number = document.createElement("output");
    number.className = "item__number";
    number.value = cartGoods[id];
    console.log("cartGoods[id]: ", cartGoods[id]);

    const btnIncrement = document.createElement("button");
    btnIncrement.className = "item__btn item__btn_increment";
    btnIncrement.textContent = "+";
    btnIncrement.type = "button";

    count.append(btnDecrement, number, btnIncrement);

    const itemPrice = document.createElement("p");
    itemPrice.className = "item__price";
    itemPrice.textContent = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);

    const btnRemove = document.createElement("button");
    btnRemove.className = "item__remove-cart";
    btnRemove.innerHTML = `
      <svg>
        <use href="#remove" />
      </svg>
    `;

    control.append(count, itemPrice, btnRemove);

    li.append(img, detail, control);

    cartGoodsList.append(li);

    serviceCounter({
      wrapper: count,
      number: number,
      selectorDecrement: ".item__btn_decrement",
      selectorIncrement: ".item__btn_increment",
    });

    count.addEventListener("click", (e) => {
      const target = e.target;
      if (target.closest(".item__btn_decrement, .item__btn_increment")) {
        addToCart(id, +number.value);
        checkItems();
      }
    });

    btnRemove.addEventListener("click", () => {
      removeToCart(id);
      li.remove();
      checkItems();
    });
  });
};
