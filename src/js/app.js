// select flag-header
const btnFlag = document.querySelectorAll(".btn__flag");
const flag = document.querySelectorAll(".flag");
const flagSa = document.querySelector(".flag-sa");
const parentFlag = document.querySelector("#parent__flag");

btnFlag.forEach(function (item, i) {
  item.addEventListener("click", function (e) {
    let elementClasses = flag[i].classList;
    let span = document.createElement("span");

    span.className = elementClasses;
    flagSa.classList.add("hidden");

    if (parentFlag.firstChild) {
      parentFlag.removeChild(parentFlag.firstChild);
    }

    parentFlag.insertBefore(span, parentFlag.firstChild);
    console.log(span);
  });
});

// Selection-Language
const languages = document.querySelectorAll('[data-selector="language-item"]');
const parentLanguage = document.querySelector("#parent__language");

languages.forEach(function (item) {
  item.addEventListener("click", function (e) {
    const selectedItem = e.target.closest('[data-selector="language-item"]');

    let languageClass = selectedItem.classList[0];
    console.log(languageClass);

    if (languageClass === "american") {
      languageClass = "flag-icon flag-icon-us";
      addFun(languageClass);
    } else if (languageClass === "arabic") {
      languageClass = "flag-icon flag-icon-sa";
      addFun(languageClass);
    } else if (languageClass === "english") {
      languageClass = "flag-icon flag-icon-gb";
      addFun(languageClass);
    }
  });
});

function addFun(str) {
  let el = document.createElement("span");
  let language = document.createElement("span");
  let divParent = document.createElement("div");
  let shorthandLanguage = str.slice(20, 22);
  console.log(shorthandLanguage);
  let temp;

  if (shorthandLanguage === "gb") {
    temp = "English";
  } else if (shorthandLanguage === "us") {
    temp = "American";
  } else if (shorthandLanguage === "sa") {
    temp = "Arabic";
  }
  el.setAttribute("class", str);
  language.textContent = temp;
  language.setAttribute("class", "hidden mobile:inline-block");

  divParent.setAttribute("class", "flex gap-2");
  divParent.appendChild(el);
  divParent.appendChild(language);

  parentLanguage.appendChild(divParent);

  if (parentLanguage.firstElementChild) {
    parentLanguage.removeChild(parentLanguage.firstElementChild);
  }
}

// togel
const toggleFilters = document.querySelectorAll(".header__filter");

toggleFilters.forEach(function (item) {
  item.addEventListener("click", function () {
    // گرفتن مقادیر هدف از دیتا-اتریبیوت‌های همین المانی که کلیک شده
    const targetBlockSelector = item.dataset.target;
    const iconSelector = item.dataset.icon;

    // پیدا کردن المنت‌های مربوطه در صفحه
    const block = document.querySelector(targetBlockSelector);
    const icon = document.querySelector(iconSelector);

    // انجام عملیات Toggle
    if (block) {
      block.classList.toggle("filter-toggle");
    }

    if (icon) {
      icon.classList.toggle("rotate-180");
    }
  });
});

/// check-item

const categoryItems = document.querySelectorAll(".category-li");
let filterLi = [];

categoryItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const category = item.dataset.category;
    const checkIcon = item.querySelector(".check-icon"); // انتخاب تیکِ مخصوصِ همین سطر

    const index = filterLi.indexOf(category);

    if (index === -1) {
      filterLi.push(category);
      checkIcon.classList.remove("opacity-0");
    } else {
      filterLi.splice(index, 1);
      checkIcon.classList.add("opacity-0");
    }

    console.log("دسته‌بندی‌های انتخاب شده:", filterLi);
  });
});
// ================= Price Range Filter (Slider + Inputs) =================

window.onload = function () {
  slideMin();
  slideMax();
};

const minVal = document.querySelector(".range-min");
const maxVal = document.querySelector(".range-max");
const priceInputMin = document.querySelector(".min-input");
const priceInputMax = document.querySelector(".max-input");
const minTooltip = document.querySelector(".min-tooltip");
const maxTooltip = document.querySelector(".max-tooltip");
const minGap = 0;
const range = document.querySelector(".slider-track");
const sliderMinValue = parseInt(minVal.min);
const sliderMaxValue = parseInt(maxVal.max);

function slideMin() {
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if (gap <= minGap) {
    minVal.value = parseInt(maxVal.value) - minGap;
  }
  minTooltip.innerHTML = "$" + minVal.value;
  priceInputMin.value = minVal.value;
  setArea();
}

function slideMax() {
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if (gap <= minGap) {
    maxVal.value = parseInt(maxVal.value) - minGap;
  }
  maxTooltip.innerHTML = "$" + maxVal.value;
  priceInputMax.value = maxVal.value;
  setArea();
}

function setArea() {
  range.style.left = (minVal.value / sliderMaxValue) * 100 + "%";
  minTooltip.style.left = (minVal.value / sliderMaxValue) * 100 + "%";
  range.style.right = 100 - (maxVal.value / sliderMaxValue) * 100 + "%";
  maxTooltip.style.right = 100 - (maxVal.value / sliderMaxValue) * 100 + "%";
}

function setMinInput() {
  let minPrice = parseInt(priceInputMin.value);
  if (minPrice < sliderMinValue) {
    priceInputMin.value = sliderMinValue;
  }
  minVal.value = priceInputMin.value;
  slideMin();
}

function setMaxInput() {
  let maxPrice = parseInt(priceInputMax.value);
  if (maxPrice > sliderMaxValue) {
    priceInputMax.value = sliderMaxValue;
  }
  maxVal.value = priceInputMax.value;
  slideMax();
}

// click-filter-size

const sizeCheck = document.querySelectorAll(".filter_size");
let arraySize = [];

sizeCheck.forEach(function (item) {
  item.addEventListener("click", function () {
    const sizeValue = item.dataset.size;

    const index = arraySize.indexOf(sizeValue);

    if (index === -1) {
      arraySize.push(sizeValue);
      item.classList.replace("border-gray-300", "border-[#00B0B0]");
      item.classList.add("text-[#00B0B0]");
    } else {
      arraySize.splice(index, 1);
      item.classList.replace("border-[#00B0B0]", "border-gray-300");
      item.classList.remove("text-[#00B0B0]");
    }

    console.log("سایزهای فیلتر شده:", arraySize);
  });
});

/// Color

const selectedColors = document.querySelectorAll(".filter__color");
let arrayColors = [];

selectedColors.forEach(function (item) {
  item.addEventListener("click", function () {
    const colorName = item.getAttribute("data-color");

    const index = arrayColors.indexOf(colorName);

    if (index === -1) {
      arrayColors.push(colorName);
      item.style.borderColor = "rgb(59, 130, 246)";
    } else {
      arrayColors.splice(index, 1);
      item.style.borderColor = "transparent";
    }

    console.log("آرایه رنگ‌های انتخابی:", arrayColors);
  });
});
