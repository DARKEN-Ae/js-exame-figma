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
            <a class="korzina-a" href="${item.link}">${item.text}</a>
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
// O'zgaruvchilar va DOM elementlari
const allProductsRow = document.querySelector(".allProducts-row");
let cartCount = 0;

// Mahsulotlarni olish va render qilish
const getAllProducts = ({
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
}) => `
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
        ${[1, 2]
          .map(() => `<img src="${retingFellingImg}" alt="filling-star" />`)
          .join("")}
        ${[1, 2, 3]
          .map(() => `<img src="${retingGrayStar}" alt="gray-star" />`)
          .join("")}
      </div>
      <button class="add-to-cart-btn">${btn}</button>
    </div>
  </div>
`;

// Mahsulotlarni sahifaga joylash
if (allProductsRow) {
  products.forEach((product) => {
    allProductsRow.innerHTML += getAllProducts(product);
  });

  // "love-icon" tugmasini bosish (qizil fonni o'zgartirish)
  document.querySelectorAll(".love-icon").forEach((icon, index) => {
    const localKey = `love-icon-${index}`;
    icon.style.background =
      localStorage.getItem(localKey) === "true" ? "red" : "";
    icon.addEventListener("click", () => {
      const isRed = icon.style.background === "red";
      icon.style.background = isRed ? "" : "red";
      localStorage.setItem(localKey, !isRed);
    });
  });

  // "add-to-cart-btn" tugmasini bosish (mahsulotni korzinaga qo'shish)
  document.querySelectorAll(".add-to-cart-btn").forEach((button, index) => {
    button.addEventListener("click", () => {
      const product = products[index];
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Agar mahsulot allaqachon korzinada bo'lsa, qo'shmaslik
      const isProductInCart = cart.some(
        (item) => item.foodImage === product.foodImage
      );

      if (!isProductInCart) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        cartCount++;
        updateCartCount();
      } else {
        alert("Bu mahsulot allaqachon korzinada mavjud!");
      }
    });
  });

  // Korzina sonini yangilash
  const updateCartCount = () => {
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      cartCountElement.style.display = "inline";
      cartCountElement.textContent = JSON.parse(
        localStorage.getItem("cart")
      ).length;
    }
  };

  // Sahifa yuklanganda korzina sonini yangilash
  if (localStorage.getItem("cart")) {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    cartCount = cartItems.length;
    updateCartCount();
  }
}

// Korzina sahifasi (korzinaga o'tgan foydalanuvchi uchun)
const cartContainer = document.querySelector(".cart-container");
if (cartContainer) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Korzina mahsulotlarini render qilish
  const renderCartItems = () => {
    cartContainer.innerHTML = ""; // Avvalgi mahsulotlarni o'chirish
    cartItems.forEach((item) => {
      const cartCard = `
        <div class="cart-card">
          <img src="${item.foodImage}" alt="food" />
          <div class="cart-details">
            <h3>${item.foodBoldPrice} ₽</h3>
            <p>${item.foodSmallText}</p>
            <p>${item.loremText}</p>
            <button class="remove-from-cart-btn">O'chirish</button>
          </div>
        </div>
      `;
      cartContainer.innerHTML += cartCard;
    });
  };

  // Dastlabki render
  renderCartItems();

  // "remove-from-cart-btn" tugmasini bosish (mahsulotni korzinadan o'chirish)
  document
    .querySelectorAll(".remove-from-cart-btn")
    .forEach((button, index) => {
      button.addEventListener("click", () => {
        const productToRemove = cartItems[index];
        const updatedCart = cartItems.filter(
          (item) => item.foodImage !== productToRemove.foodImage
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        renderCartItems();
        updateCartCount();
      });
    });
}

// get product2
const allProductsRowTwo = document.querySelector(".allProducts-row-two");
const getAllProductsTwo = ({
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
}) => `
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
        ${[1, 2]
          .map(() => `<img src="${retingFellingImg}" alt="filling-star" />`)
          .join("")}
        ${[1, 2, 3]
          .map(() => `<img src="${retingGrayStar}" alt="gray-star" />`)
          .join("")}
      </div>
      <button>${btn}</button>
    </div>
  </div>
`;

if (allProductsRowTwo) {
  productsTwo.forEach(
    (product) => (allProductsRowTwo.innerHTML += getAllProductsTwo(product))
  );
  document
    .querySelectorAll(".allProducts-row-two .love-icon")
    .forEach((icon, index) => {
      const localKey = `love-icon-${index}`;
      icon.style.backgroundColor =
        localStorage.getItem(localKey) === "true" ? "red" : "";
      icon.addEventListener("click", () => {
        const isRed = icon.style.backgroundColor === "red";
        icon.style.backgroundColor = isRed ? "" : "red";
        localStorage.setItem(localKey, !isRed);
      });
    });
}

// get product3
const allProductsRowThree = document.querySelector(".allProducts-row-three");
const getAllProductsThree = ({
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
}) => `
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
        ${[1, 2]
          .map(() => `<img src="${retingFellingImg}" alt="filling-star" />`)
          .join("")}
        ${[1, 2, 3]
          .map(() => `<img src="${retingGrayStar}" alt="gray-star" />`)
          .join("")}
      </div>
      <button>${btn}</button>
    </div>
  </div>
`;

// Sahifaga mahsulotlarni qo'shish
if (allProductsRowThree) {
  productsThree.forEach(
    (product) => (allProductsRowThree.innerHTML += getAllProductsThree(product))
  );
  document
    .querySelectorAll(".allProducts-row-three .love-icon")
    .forEach((icon) => {
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
