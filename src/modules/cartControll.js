const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key) || "{}");
const setLocalStorage = (key, value) =>
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

const checkItems = (classDelete) => {
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
};

export const cartControl = ({ wrapper, classAdd, classDelete }) => {
  checkItems(classDelete);

  if (wrapper) {
    wrapper.addEventListener("click", (e) => {
      const target = e.target;

      const id = target.dataset.idGoods;

      if (!id) return;

      if (target.closest(`.${classDelete}`)) {
        removeToCart(id);
      } else if (target.closest(`.${classAdd}`)) {
        addToCart(id);
      }

      checkItems(classDelete);
    });
  }
};
