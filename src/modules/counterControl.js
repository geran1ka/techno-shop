export const serviceCounter = ({
  wrapper,
  number,
  selectorDecrement,
  selectorIncrement,
}) => {
  let wrapCounter;
  let numberElem;
  if (typeof wrapper === "string") {
    wrapCounter = document.querySelector(wrapper);
    numberElem = wrapCounter.querySelector(number);
  } else {
    wrapCounter = wrapper;
    numberElem = number;
  }

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
