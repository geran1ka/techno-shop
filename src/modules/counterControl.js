export const serviceCounter = ({
  selectorWrapper,
  selectorNumber,
  selectorDecrement,
  selectorIncrement,
}) => {
  const wrapCounter = document.querySelector(selectorWrapper);
  const numberElem = document.querySelector(selectorNumber);

  wrapCounter.addEventListener("click", (e) => {
    const target = e.target;

    if (target.closest(selectorDecrement)) {
      numberElem.value = +numberElem.value === 1 ? 1 : +numberElem.value - 1;
    }

    if (target.closest(selectorIncrement)) {
      numberElem.value = +numberElem.value + 1;
    }
  });
};
