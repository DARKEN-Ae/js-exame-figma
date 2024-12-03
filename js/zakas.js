let orderProductElements = document.querySelectorAll(".order-products");

function createOrderCard({
  name,
  showIcon,
  shopText,
  loveIcon,
  foodImage,
  foodPrice,
  foodDescription,
  buyBtn,
}) {
  return `
    <div class="order-card">
      <div class="mini-top-icon">
        <div class="shop-icon">
          <img src="${showIcon}" alt="shop" />
          ${shopText}
        </div>
        <img src="${loveIcon}" alt="love" />
      </div>
      <img src="${foodImage}" alt="food image" />
      <div class="food-title">
        <h1>${foodPrice} ₽</h1>
        <p>${foodDescription}</p>
        <h1>${name}</h1> <!-- Mahsulot nomi qo'shildi -->
        <div class="order-rate">
          <img src="../assets/icon/filling-star.png" alt="star" />
          <img src="../assets/icon/filling-star.png" alt="star" />
          <img src="../assets/icon/gray-star.png" alt="star" />
          <img src="../assets/icon/gray-star.png" alt="star" />
          <img src="../assets/icon/gray-star.png" alt="star" />
        </div>
        <button>${buyBtn}</button>
      </div>
    </div>`;
}

let orderProductElement = document.querySelector(".order-products");
let searchInput = document.querySelector("#search");

function displayProducts(products) {
  orderProductElement.innerHTML = "";
  products.forEach((product) => {
    orderProductElement.innerHTML += createOrderCard(product);
  });
}

displayProducts(orderProducts);

searchInput.addEventListener("input", function () {
  let searchText = searchInput.value.toLowerCase();
  let filteredProducts = orderProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText)
  );

  displayProducts(filteredProducts);
});
