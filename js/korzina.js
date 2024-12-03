const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.querySelector("#cart-items");

cartItems.forEach((product, index) => {
  if (!product.quantity) {
    product.quantity = 1;
  }

  const cartItemHTML = `
    <div class="cart-item">
      <img src="${product.foodImage}" alt="food">
      <h3>${product.foodBoldPrice} ₽</h3>
      <p>${product.loremText}</p>
      <div class="quantity-controls">
        <button class="decrease-btn">-</button>
        <span class="quantity">${product.quantity}</span>
        <button class="increase-btn">+</button>
      </div>
      <button class="remove-from-cart-btn" data-index="${index}">Удалить</button>
    </div>
  `;
  cartItemsContainer.innerHTML += cartItemHTML;
});

document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");

    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    location.reload();
  });
});

document.querySelectorAll(".increase-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const quantityElement = button.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent, 10);

    if (isNaN(quantity)) {
      quantity = 1;
    }
    quantity++;
    quantityElement.textContent = quantity;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

document.querySelectorAll(".decrease-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const quantityElement = button.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent, 10);

    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart[index].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
});
