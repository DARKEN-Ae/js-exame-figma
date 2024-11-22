// menu-toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle");
  const menu = document.querySelector(".cotalof-menu");

  toggleButton.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
  });
});

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
  // productCount.innerText = data.length;
}

document.addEventListener("DOMContentLoaded", () => {
  getProductSlider();
});

// cards-section
let allProductsRow = document.querySelector(".allProducts-row");

function getProductCard({
  price,
  priceV2,
  category,
  description: dec,
  rating,
  ratingV2,
  images,
}) {
  return `
  <div class="product-card">
      <div class="product-card__body">
        <img src=${images[0]} />
      </div>
      <div class="product-card__footer">
        <h3> ${price} $ </h3>
        <p> ${category} </p>
        <p> ${dec}</p>
        <img src=${rating} />
        <button>В корзину</button>
      </div>
    </div>`;
}
