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
