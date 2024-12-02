// menu-toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle");
  const menu = document.querySelector(".cotalof-menu");

  toggleButton.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
  });
});

// header
const headerContainer = document.querySelector(".nav-section-row");
const {
  brandLogo,
  menuIcon,
  searchIcon,
  favoriteIcon,
  ordersIcon,
  cartIcon,
  userAvatar,
  indicatorIcon,
  userName,
  menuItems,
} = headerData;
function renderHeader() {
  headerContainer.innerHTML = `
    <div class="brend-cotalog-search-div">
      <a href="/">
        <img src="${brandLogo}" alt="brend" />
      </a>
      <div class="menu-btn-cotalog">
        <img class="toggle" src="${menuIcon}" alt="menu" />
        <p><a href="../page/cotalog.html">Каталог</a></p>
      </div>
      <input type="text" placeholder="Найти товар" />
      <img class="search-img" src="${searchIcon}" alt="search" />
    </div>
    <div class="menu">
      <ul class="header-ul">
        ${menuItems
          .map(
            (item) => `
          <li class="header-li">
            <img src="${item.icon}" alt="${item.text}" />
            <a href="${item.link}">${item.text}</a>
            ${
              item.text === "Корзина"
                ? '<span class="cart-count" style="display: none;">0</span>'
                : ""
            }
          </li>
        `
          )
          .join("")}
      </ul>
      <div class="user">
        <img src="${userAvatar}" alt="avatar" />
        ${userName}
        <img class="indicator" src="${indicatorIcon}" alt="indicator" />
      </div>
    </div>
  `;
}
renderHeader();
// dostavka
let homeSlider = document.querySelector(".home-slider");
let productCount = document.querySelector(".product-count");
function getSlider({ img, name }) {
  return `
  <div class="sliders">
    <img src=${img} alt="${name}" />
    <h1>${name}</h1>
  </div>
  `;
}
function getProductSlider(data = dostavka) {
  homeSlider.innerHTML = "";
  if (data.length !== 0) {
    data.forEach((item) => {
      homeSlider.innerHTML += getSlider(item);
    });
  } else {
    homeSlider.innerHTML = "<h1>Not found</h1>";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  getProductSlider();
});
// get product1
let allProductsRow = document.querySelector(".allProducts-row");

let cartCount = 0;

function getAllProducts({
  foodLove,
  foodImage,
  foodSkidka,
  foodBoldPrice,
  foodSmallText,
  foodDefPrice,
  foodDeftext,
  loremText,
  retingFellingImg,
  retingGrayStar,
  btn,
}) {
  return `
    <div class="card">
      <div class="in-card-img">
        <img class="love-icon" src="${foodLove}" alt="love-icon" />
        <img class="food-img" src="${foodImage}" alt="food" />
        <span>${foodSkidka}</span>
      </div>
      <div class="in-card-text">
        <div class="one-two-text-father">
          <div class="one-text">
            <h3>${foodBoldPrice} ₽</h3>
            <p>${foodSmallText}</p>
          </div>
          <div class="two-text">
            <h3>${foodDefPrice} ₽</h3>
            <p>${foodDeftext}</p>
          </div>
        </div>
        <p class="lorem-text">${loremText}</p>
        <div class="reting">
          <img src="${retingFellingImg}" alt="filling-star" />
          <img src="${retingFellingImg}" alt="filling-star" />
          <img src="${retingGrayStar}" alt="gray-star" />
          <img src="${retingGrayStar}" alt="gray-star" />
          <img src="${retingGrayStar}" alt="gray-star" />
        </div>
        <button class="add-to-cart-btn">${btn}</button>
      </div>
    </div>
  `;
}

if (allProductsRow) {
  products.forEach((product) => {
    allProductsRow.innerHTML += getAllProducts(product);
  });

  const loveIcons = document.querySelectorAll(".love-icon");
  loveIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.style.filter =
        "invert(18%) sepia(87%) saturate(5994%) hue-rotate(357deg) brightness(96%) contrast(110%)";
    });
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartCount++;
      updateCartCount();
    });
  });
}

function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.style.display = "inline";
    cartCountElement.textContent = cartCount;
  }
}

// get product2
let allProductsRowTwo = document.querySelector(".allProducts-row-two");
function getAllProductsTwo({
  foodLove,
  foodImage,
  foodSkidka,
  foodBoldPrice,
  foodSmallText,
  foodDefPrice,
  foodDeftext,
  loremText,
  retingFellingImg,
  retingGrayStar,
  btn,
}) {
  return `
    <div class="card">
      <div class="in-card-img">
        <img class="love-icon" src="${foodLove}" alt="love-icon" />
        <img class="food-img" src="${foodImage}" alt="food" />
        <span>${foodSkidka}</span>
      </div>
      <div class="in-card-text">
        <div class="one-two-text-father">
          <div class="one-text">
            <h3>${foodBoldPrice} ₽</h3>
            <p>${foodSmallText}</p>
          </div>
          <div class="two-text">
            <h3>${foodDefPrice} ₽</h3>
            <p>${foodDeftext}</p>
          </div>
        </div>
        <p class="lorem-text">${loremText}</p>
        <div class="reting">
          <img src="${retingFellingImg}" alt="filling-star" />
          <img src="${retingFellingImg}" alt="filling-star" />
          <img src="${retingGrayStar}" alt="gray-star" />
          <img src="${retingGrayStar}" alt="gray-star" />
          <img src="${retingGrayStar}" alt="gray-star" />
        </div>
        <button>${btn}</button>
      </div>
    </div>
  `;
}
if (allProductsRowTwo) {
  productsTwo.forEach((productsTwo) => {
    allProductsRowTwo.innerHTML += getAllProductsTwo(productsTwo);
  });

  const loveIconsTwo = document.querySelectorAll(
    ".allProducts-row-two .love-icon"
  );
  loveIconsTwo.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.style.filter =
        "invert(18%) sepia(87%) saturate(5994%) hue-rotate(357deg) brightness(96%) contrast(110%)";
    });
  });
}
// get product3
let allProductsRowThree = document.querySelector(".allProducts-row-three");
function getAllProductsThree({
  foodLove,
  foodImage,
  foodSkidka,
  foodBoldPrice,
  foodSmallText,
  foodDefPrice,
  foodDeftext,
  loremText,
  retingFellingImg,
  retingGrayStar,
  btn,
}) {
  return `
    <div class="card">
      <div class="in-card-img">
        <img class="love-icon" src="${foodLove}" alt="love-icon" />
        <img class="food-img" src="${foodImage}" alt="food" />
        <span>${foodSkidka}</span>
      </div>
      <div class="in-card-text">
        <div class="one-two-text-father">
          <div class="one-text">
            <h3>${foodBoldPrice} ₽</h3>
            <p>${foodSmallText}</p>
          </div>
          <div class="two-text">
            <h3>${foodDefPrice} ₽</h3>
            <p>${foodDeftext}</p>
          </div>
        </div>
        <p class="lorem-text">${loremText}</p>
        <div class="reting">
          <img src="${retingFellingImg}" alt="filling-star" />
          <img src="${retingFellingImg}" alt="filling-star" />
          <img src="${retingGrayStar}" alt="gray-star" />
          <img src="${retingGrayStar}" alt="gray-star" />
          <img src="${retingGrayStar}" alt="gray-star" />
        </div>
        <button>${btn}</button>
      </div>
    </div>
  `;
}

if (allProductsRowThree) {
  productsThree.forEach((productsThree) => {
    allProductsRowThree.innerHTML += getAllProductsThree(productsThree);
  });

  const loveIconsThree = document.querySelectorAll(
    ".allProducts-row-three .love-icon"
  );
  loveIconsThree.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.style.filter =
        "invert(18%) sepia(87%) saturate(5994%) hue-rotate(357deg) brightness(96%) contrast(110%)";
    });
  });
}
// more-cards
let inThreeCards = document.querySelector(".in-three-cards");
function getMoreCards({
  finishCardImg,
  finishCardData,
  finishCardLoremText,
  finishCardLongText,
  finishCardBtn,
}) {
  return `
   <div class="card-three-in">
      <img src=${finishCardImg} alt="stop" />
        <p class="data-text">${finishCardData}</p>
         <h3>
          ${finishCardLoremText}
         </h3>
          <p class="long-text">
           ${finishCardLongText}
          </p>
        <button>${finishCardBtn}</button>
    </div>
  `;
}
if (inThreeCards) {
  finishCards.forEach((finishCards) => {
    inThreeCards.innerHTML += getMoreCards(finishCards);
  });
}
