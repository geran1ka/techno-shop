const createItemPagination = (hrefLink, textContent, active) => {
  const li = document.createElement("li");
  li.className = "pagination__item";

  const a = document.createElement("a");
  a.className = "pagination__link";
  a.textContent = textContent;
  a.href = hrefLink;

  if (active) {
    a.classList.add("pagination__link_active");
  }

  li.append(a);

  return li;
};

const pagination = ({ wrapper, pages, page, count }) => {
  wrapper.textContent = "";

  const paginarionList = document.createElement("ul");
  paginarionList.className = "pagination__list";

  const isNotStart = page - Math.floor(count / 2) > 1;

  const isEnd = page + Math.floor(count / 2) > pages;

  if (count > pages) {
    count = pages;
  }

  for (let i = 0; i < count; i++) {
    let n = i + 1;

    if (isNotStart) {
      if (isEnd) {
        n = pages - count + i + 1;
      } else {
        n = page - Math.floor(count / 2) + i;
      }
    }

    const url = new URL(location);
    url.searchParams.set("page", n);
    const li = createItemPagination(url, n, page === n);

    paginarionList.append(li);
  }

  const firstItem = document.createElement("a");
  firstItem.classList.add("pagination__arrow", "pagination__arrow_start");
  firstItem.href = isNotStart ? "index.html" : "";
  firstItem.ariaLabel = "перейти на первую страницу";

  firstItem.innerHTML = `
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.092 3.49205L7.59598 9.00005L13.092 14.508L11.4 16.2L4.19998 9.00005L11.4 1.80005L13.092 3.49205Z"
      />
    </svg>
  `;

  const lastItem = document.createElement("a");

  lastItem.classList.add("pagination__arrow", "pagination__arrow_end");
  lastItem.href = isEnd ? "" : `index.html?page=${pages}`;
  lastItem.ariaLabel = "перейти на последнюю страницу";
  lastItem.innerHTML = `
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.90802 3.49205L10.404 9.00005L4.90802 14.508L6.60002 16.2L13.8 9.00005L6.60002 1.80005L4.90802 3.49205Z"
      />
    </svg>
  `;

  wrapper.append(firstItem, paginarionList, lastItem);
};

export const startPagination = ({ paginationWrapper, pages, page }) => {
  let isMobile = false;

  if (window.innerWidth <= 560) {
    pagination({
      wrapper: paginationWrapper,
      pages,
      page,
      count: 4,
    });
    isMobile = true;
  } else {
    pagination({
      wrapper: paginationWrapper,
      pages,
      page,
      count: 6,
    });
    isMobile = false;
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 560 && !isMobile) {
      pagination({
        wrapper: paginationWrapper,
        pages,
        page,
        count: 4,
      });
      isMobile = true;
    }

    if (window.innerWidth > 560 && isMobile) {
      pagination({
        wrapper: paginationWrapper,
        pages,
        page,
        count: 6,
      });
      isMobile = false;
    }
  });
};
