import { API_URL } from "./const";

export const getGoods = () => {
  const pageURL = new URL(location);
  const url = new URL(`${API_URL}api/goods`);

  for (const [name, value] of pageURL.searchParams.entries()) {
    url.searchParams.set(name, value);
  }

  return fetch(url).then((response) => response.json());
};

export const getGoodsItem = (id) =>
  fetch(`${API_URL}api/goods/${id}`).then((response) => response.json());

export const getCategory = () =>
  fetch(`${API_URL}api/category`).then((response) => response.json());

export const getGoodsList = (list) =>
  fetch(`${API_URL}api/goods/?list=${list}`).then((response) =>
    response.json()
  );
