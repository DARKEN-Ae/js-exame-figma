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
// -------------get product1----------------
const allProductsRow = document.querySelector(".allProducts-row");
let cartCount = 0;
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
if (allProductsRow) {
  products.forEach((product) => {
    allProductsRow.innerHTML += getAllProducts(product);
  });

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

  document.querySelectorAll(".add-to-cart-btn").forEach((button, index) => {
    button.addEventListener("click", () => {
      const product = products[index];
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

  const updateCartCount = () => {
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      cartCountElement.style.display = "inline";
      cartCountElement.textContent = JSON.parse(
        localStorage.getItem("cart")
      ).length;
    }
  };

  if (localStorage.getItem("cart")) {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    cartCount = cartItems.length;
    updateCartCount();
  }
}
const cartContainer = document.querySelector(".cart-container");
if (cartContainer) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const renderCartItems = () => {
    cartContainer.innerHTML = "";
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

  renderCartItems();

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

// -------------get product2----------------
const allProductsRowTwo = document.querySelector(".allProducts-row-two");
let cartCountTwo = 0;

const getAllProductsTwo = ({
  id,
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
  <div class="card" data-id="${id}">
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
if (allProductsRowTwo) {
  productsTwo.forEach((product) => {
    allProductsRowTwo.innerHTML += getAllProductsTwo(product);
  });

  document
    .querySelectorAll(".allProducts-row-two .love-icon")
    .forEach((icon, index) => {
      const productId = productsTwo[index].id;
      const localKey = `love-icon-${productId}`;

      icon.style.background =
        localStorage.getItem(localKey) === "true" ? "red" : "";

      icon.addEventListener("click", () => {
        const isRed = icon.style.background === "red";
        icon.style.background = isRed ? "" : "red";
        localStorage.setItem(localKey, !isRed);
      });
    });

  document
    .querySelectorAll(".allProducts-row-two .add-to-cart-btn")
    .forEach((button, index) => {
      button.addEventListener("click", () => {
        const product = productsTwo[index];
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const isProductInCart = cart.some(
          (item) => item.foodImage === product.foodImage
        );

        if (!isProductInCart) {
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          cartCountTwo++;
          updateCartCountTwo();
        } else {
          alert("Bu mahsulot allaqachon korzinada mavjud!");
        }
      });
    });

  const updateCartCountTwo = () => {
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      cartCountElement.style.display = "inline";
      cartCountElement.textContent = JSON.parse(
        localStorage.getItem("cart")
      ).length;
    }
  };

  if (localStorage.getItem("cart")) {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    cartCountTwo = cartItems.length;
    updateCartCountTwo();
  }
}

// -------------get product3----------------
const allProductsRowThree = document.querySelector(".allProducts-row-three");
let cartCountThree = 0;

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
      <button class="add-to-cart-btn-three">${btn}</button>
    </div>
  </div>
`;

if (allProductsRowThree) {
  productsThree.forEach((product) => {
    allProductsRowThree.innerHTML += getAllProductsThree(product);
  });

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

  document
    .querySelectorAll(".add-to-cart-btn-three")
    .forEach((button, index) => {
      button.addEventListener("click", () => {
        const product = productsThree[index];
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const isProductInCart = cart.some(
          (item) => item.foodImage === product.foodImage
        );

        if (!isProductInCart) {
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          cartCountThree++;
          updateCartCountThree();
        } else {
          alert("Bu mahsulot allaqachon korzinada mavjud!");
        }
      });
    });

  const updateCartCountThree = () => {
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      cartCountElement.style.display = "inline";
      cartCountElement.textContent = JSON.parse(
        localStorage.getItem("cart")
      ).length;
    }
  };

  if (localStorage.getItem("cart")) {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    cartCountThree = cartItems.length;
    updateCartCountThree();
  }
}

const cartContainerThree = document.querySelector(".cart-container");
if (cartContainerThree) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const renderCartItemsThree = () => {
    cartContainerThree.innerHTML = "";
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
      cartContainerThree.innerHTML += cartCard;
    });
  };

  renderCartItemsThree();

  document
    .querySelectorAll(".remove-from-cart-btn")
    .forEach((button, index) => {
      button.addEventListener("click", () => {
        const productToRemove = cartItems[index];
        const updatedCart = cartItems.filter(
          (item) => item.foodImage !== productToRemove.foodImage
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        renderCartItemsThree();
        updateCartCountThree();
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
