import { getCategory } from "./goodsService";

export const footerCategory = () => {
  const listCategory = document.querySelector(".footer__list_double");
  getCategory().then((categoryList) => {
    for (const categoryListKey in categoryList) {
      if (Object.hasOwnProperty.call(categoryList, categoryListKey)) {
        const li = document.createElement("li");
        li.className = "footer__item";

        const link = document.createElement("a");
        link.className = "footer__link";
        link.textContent = categoryList[categoryListKey];
        link.href = categoryListKey;

        li.append(link);
        listCategory.append(li);
      }
    }
  });
};
