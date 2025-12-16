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

  divParent.setAttribute("class", "flex gap-2");
  divParent.appendChild(el);
  divParent.appendChild(language);

  parentLanguage.appendChild(divParent);

  if (parentLanguage.firstElementChild) {
    parentLanguage.removeChild(parentLanguage.firstElementChild);
  }
}

// togel
const toggleFilter = document.querySelectorAll(".header__filter");

toggleFilter.forEach(function (item) {
  item.addEventListener("click", oppenBox);
});

function oppenBox(e) {
  let classParent = e.currentTarget.classList[1];
  let temp;
  let block;

  if (classParent === "clothing") {
    temp = "icon_cloting";
    block = "filter-block-1";
  } else if (classParent === "price") {
    temp = "icon_price";
    block = "filter-block-2";
  } else if (classParent === "size") {
    temp = "icon_size";
    block = "filter-block-3";
  } else if (classParent === "color") {
    temp = "icon_color";
    block = "filter-block-4";
  }

  console.log(temp);

  toggleIcon(temp, block);
}

function toggleIcon(id, block) {
  let iconId = document.querySelector("#" + id);
  let blockFilter = document.querySelector("." + block);
  console.log();

  iconId.classList.toggle("rotate-180");

  blockFilter.classList.forEach(function (item) {
    if (item === "filter-toggle") {
      blockFilter.classList.remove("filter-toggle");
    } else {
      blockFilter.classList.add("filter-toggle");
    }
  });
}

/// check-item

const categoryLi = document.querySelectorAll(".category-li");
const checkItem = document.querySelectorAll("#check-box");
let filterLi = []; //مهمه چرا چون ما بعدا برای فیلتر کردن بهش نیاز داریم

categoryLi.forEach(function (item) {
  item.addEventListener("click", function () {
    let y = item.classList[1];
    let x;
    if (y === "li-clothing") {
      x = "check-clothing";
    } else if (y === "li-dresses") {
      x = "check-dresses";
    } else if (y === "li-pants") {
      x = "check-pants";
    } else if (y === "li-shirt") {
      x = "check-shirt";
    } else if (y === "li-shoes") {
      x = "check-shoes";
    } else if (y === "li-vintage") {
      x = "check-vintage";
    }
    toCheck(x);
    filterLi.push(y);
    console.log(filterLi);
  });
});

function toCheck(x) {
  const z = document.querySelector("." + x);

  z.classList.forEach(function (item) {
    if (item !== "opacity-0") {
      z.classList.add("opacity-0");
    } else {
      z.classList.remove("opacity-0");
    }
  });
}

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
let arraySize = []; /// مهم

sizeCheck.forEach(function (item) {
  item.addEventListener("click", function () {
    let borderClassName = item.classList[1]; // نام کلاس بوردر فعلی (مثلاً border-gray-300)
    handleSizeBorder(borderClassName);
  });
});

function handleSizeBorder(borderClassName) {
  let selectedElement = document.querySelector("." + borderClassName);
  arraySize.push(borderClassName);
  console.log(borderClassName);

  if (selectedElement) {
    if (selectedElement.classList.contains("border-gray-300")) {
      selectedElement.classList.replace("border-gray-300", "border-[#00B0B0]");
    } else if (selectedElement.classList.contains("border-[#00B0B0]")) {
      selectedElement.classList.replace("border-[#00B0B0]", "border-gray-300");
    }
  }
}
