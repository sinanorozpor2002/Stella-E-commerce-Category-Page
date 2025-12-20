import { allProducts } from "./data.js";

const filterLi = [];
const arraySize = [];
const arrayColors = [];

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
    const targetBlockSelector = item.dataset.target;
    const iconSelector = item.dataset.icon;

    const block = document.querySelector(targetBlockSelector);
    const icon = document.querySelector(iconSelector);

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

categoryItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const category = item.dataset.category;
    const checkIcon = item.querySelector(".check-icon");

    const index = filterLi.indexOf(category);

    if (index === -1) {
      filterLi.push(category);
      checkIcon.classList.remove("opacity-0");
    } else {
      filterLi.splice(index, 1);
      checkIcon.classList.add("opacity-0");
    }

    console.log("دسته‌بندی‌های انتخاب شده:", filterLi);
    applyFilters();
  });
});

// ================= Price Range Logic =================

const minVal = document.querySelector(".range-min");
const maxVal = document.querySelector(".range-max");
const priceInputMin = document.querySelector(".min-input");
const priceInputMax = document.querySelector(".max-input");
const minTooltip = document.querySelector(".min-tooltip");
const maxTooltip = document.querySelector(".max-tooltip");
const range = document.querySelector(".slider-track");

const sliderMinValue = parseInt(minVal.min);
const sliderMaxValue = parseInt(maxVal.max);
const minGap = 5;

function setArea() {
  range.style.left = (minVal.value / sliderMaxValue) * 100 + "%";
  minTooltip.style.left = (minVal.value / sliderMaxValue) * 100 + "%";
  range.style.right = 100 - (maxVal.value / sliderMaxValue) * 100 + "%";
  maxTooltip.style.right = 100 - (maxVal.value / sliderMaxValue) * 100 + "%";
}

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
    maxVal.value = parseInt(minVal.value) + minGap; // اصلاح فاصله
  }
  maxTooltip.innerHTML = "$" + maxVal.value;
  priceInputMax.value = maxVal.value;
  setArea();
}

minVal.addEventListener("input", () => {
  slideMin();
  applyFilters();
});

maxVal.addEventListener("input", () => {
  slideMax();
  applyFilters();
});

slideMin();
slideMax();

// click-filter-size

const sizeCheck = document.querySelectorAll(".filter_size");

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

    applyFilters();

    console.log("سایزهای فیلتر شده:", arraySize);
  });
});

/// Color

const selectedColors = document.querySelectorAll(".filter__color");

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
    applyFilters();
  });
});

////   Layout Switcher

const viewButtons = document.querySelectorAll(".view-btn");
const activeBg = document.querySelector("#active-bg");
let currentView = "grid";

viewButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const view = btn.dataset.view;
    currentView = view;

    if (view === "grid") {
      activeBg.style.left = "4px";
    } else {
      activeBg.style.left = "52%";
    }

    viewButtons.forEach((b) => {
      b.classList.remove("text-active");
      b.classList.add("text-inactive");
    });
    btn.classList.add("text-active");
    btn.classList.remove("text-inactive");

    console.log(currentView);
  });
});

///////////////////////////////////////////////////////////// مقایسه دسته بندی

function applyFilters() {
  let filteredProducts = [];
  if (filterLi.length > 0) {
    filterLi.forEach((catName) => {
      filteredProducts = [...filteredProducts, ...allProducts[catName]];
    });
  } else {
    filteredProducts = [...allProducts["clothing"]];
  }

  // ==========================================
  //  فیلتر چندگانه (قیمت، سایز، رنگ)
  // ==========================================

  const finalResult = filteredProducts.filter((product) => {
    const priceMatch =
      product.price >= parseInt(minVal.value) &&
      product.price <= parseInt(maxVal.value);

    const sizeMatch =
      arraySize.length === 0 ||
      product.sizes.some((s) => arraySize.includes(s));

    const colorMatch =
      arrayColors.length === 0 ||
      product.colors.some((c) => arrayColors.includes(c));

    if (!priceMatch)
      console.log(
        `حذف به خاطر قیمت: ${product.price} (بازه: ${minVal.value}-${maxVal.value})`
      );
    if (!sizeMatch) console.log(`حذف به خاطر سایز: ${product.sizes}`);
    if (!colorMatch) console.log(`حذف به خاطر رنگ: ${product.colors}`);

    return priceMatch && sizeMatch && colorMatch;
  });

  console.log("لیست نهایی برای ساخت کارت‌ها:", finalResult);
  renderProducts(finalResult);
}

applyFilters();

function renderProducts(products) {
  const productContainer = document.querySelector("#card__product");
  productContainer.addEventListener("click", function (e) {
    ///// check-heart
    if (e.target.classList.contains("heart_icon")) {
      const icon = e.target;

      if (icon.classList.contains("fa-regular")) {
        icon.classList.replace("fa-regular", "fa-solid");
        icon.classList.replace("text-gray-500", "text-red-500");
      } else {
        icon.classList.replace("fa-solid", "fa-regular");
        icon.classList.replace("text-red-500", "text-gray-500");
      }
    }
  });

  // ۱. اول ظرف را کاملاً خالی می‌کنیم تا نتایج قبلی پاک شوند
  productContainer.innerHTML = "";

  // ۲. اگر محصولی پیدا نشد، یک پیغام نمایش می‌دهیم
  if (products.length === 0) {
    productContainer.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">هیچ محصولی با این مشخصات پیدا نشد 🧐</div>`;
    return;
  }

  // ۳. روی تک‌تک محصولات آرایه می‌چرخیم و HTML می‌سازیم
  products.forEach((product) => {
    const cardHTML = `
      <div class="group [perspective:1000px] w-full mx-auto">
        <div class="relative rounded-md flex flex-col h-full shadow-lg overflow-hidden bg-white">
          <div class="relative h-[300px] rounded-br-md rounded-bl-md overflow-hidden desktop:h-[350px] w-full [transform-style:preserve-3d]">
            <figure class="transition-all duration-[800ms] ease-out absolute inset-0 w-full h-full [backface-visibility:hidden] group-hover:[transform:rotateY(-180deg)]">
              <img class="object-fill object-top h-full w-full" src="${
                product.images.front
              }" alt="${product.name}" />
            </figure>
            <figure class="transition-all duration-[800ms] ease-out absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] group-hover:[transform:rotateY(0deg)]">
              <img class="object-fill object-top h-full w-full" src="${
                product.images.back
              }" alt="${product.name}" />
            </figure>
          </div>
          <div class="flex flex-col gap-y-2 mt-2 px-2 pb-2">
            <div class="flex justify-between">
              <h2 class="text-gray-500">${product.brand || "Uniqlo"}</h2>
              <i class="heart_icon fa-regular fa-heart text-gray-500 cursor-pointer"></i>
            </div>
            <h2 class="text-lg font-medium">${product.title}</h2>
            <div class="flex justify-between">
              <div class="text-blue-500 font-bold">$${product.price}</div>
              <div class="text-red-500 text-sm">${
                product.stock || 0
              } left!</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // ۴. کارت ساخته شده را به انتهای ظرف اضافه می‌کنیم
    productContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}
