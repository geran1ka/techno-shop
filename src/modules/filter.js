import { getCategory, getGoods } from "./goodsService";
import { hideOverlay, showOverlay } from "./overlay";
import { startPagination } from "./pagination";
import { renderGoods } from "./renderGoods";

const toggleFilter = (filter, catalogFilterBtn, filterTitle) => {
  catalogFilterBtn.addEventListener("click", () => {
    filter.classList.add("filter_show");
    showOverlay();
  });

  filterTitle.addEventListener("click", () => {
    filter.classList.remove("filter_show");
    hideOverlay();
  });
};

export const filter = (goodsList, paginationWrapper) => {
  const filter = document.querySelector(".filter");
  const catalogFilterBtn = document.querySelector(".catalog__filter-btn");
  const filterTitle = document.querySelector(".filter__title");
  const category = document.querySelector("#category");

  toggleFilter(filter, catalogFilterBtn, filterTitle);

  getCategory().then((categoryList) => {
    for (const categoryListKey in categoryList) {
      if (Object.hasOwnProperty.call(categoryList, categoryListKey)) {
        const option = document.createElement("option");
        option.value = categoryListKey;
        option.textContent = categoryList[categoryListKey];
        category.append(option);
      }
    }
  });

  const filterForm = document.querySelector(".filter__form");
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxes = new Set();

    [...filterForm.elements].forEach((elem) => {
      if (elem.type === "checkbox") {
        checkboxes.add(elem.name);
      }
    });

    const data = {};

    const formData = new FormData(filterForm);
    for (const [name, value] of formData) {
      if (!value) continue;

      if (checkboxes.has(name)) {
        if (Array.isArray(data[name])) {
          data[name].push(value);
        } else {
          data[name] = [value];
        }
      } else {
        data[name] = value;
      }
    }

    goodsList.innerHTML = `
    <div class="goods__preload">
      <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M116.364 0H128C198.691 0 256 57.3091 256 128C256 198.691 198.691 256 128 256C57.3091 256 0 198.691 0 128V116.364H23.2727V128C23.2727 148.713 29.4149 168.961 40.9225 186.183C52.43 203.406 68.7862 216.829 87.9226 224.755C107.059 232.682 128.116 234.756 148.431 230.715C168.746 226.674 187.407 216.7 202.053 202.053C216.7 187.407 226.674 168.746 230.715 148.431C234.756 128.116 232.682 107.059 224.755 87.9226C216.829 68.7862 203.406 52.43 186.183 40.9225C168.961 29.4149 148.713 23.2727 128 23.2727H116.364V0Z" fill="black"/>
      </svg>
    </div>
  `;

    const url = new URL(location);

    const serach = url.searchParams.get("search");

    url.search = "";

    for (const key in data) {
      url.searchParams.set(key, data[key]);
    }

    history.pushState(null, null, url);

    getGoods().then(({ goods, pages, page }) => {
      filter.classList.remove("filter_show");
      console.log("hideOverlay");
      hideOverlay();
      renderGoods(goodsList, goods);
      startPagination({ paginationWrapper, pages, page });
    });
  });
};
