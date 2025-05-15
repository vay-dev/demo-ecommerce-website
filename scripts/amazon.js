import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { cart, updateCartQuatity, calculateCartQuantity, saveToStorage } from "../data/cart.js";

// Render products on page
function renderAmazonPage() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">${product.name}</div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${Math.round(product.rating.stars * 10)}.png">
          <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>

        <div class="product-price">${formatCurrency(product.priceCents)}</div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector">
            ${[...Array(10).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('')}
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button js-add-cart button-primary" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-product-grid').innerHTML = productsHTML;


  calculateCartQuantity();


  const addButtons = document.querySelectorAll('.js-add-cart');

  addButtons.forEach((button) => {
    const { productId } = button.dataset;
    const productContainer = button.closest('.product-container');
    const quantitySelector = productContainer.querySelector('.js-quantity-selector');

    button.addEventListener('click', () => {
      const popUpElement = button.parentElement.querySelector('.added-to-cart');

      if (popUpElement.timeoutId) {
        clearTimeout(popUpElement.timeoutId);
      }

      popUpElement.classList.add('message-shown');

      popUpElement.timeoutId = setTimeout(() => {
        popUpElement.classList.remove('message-shown');
        popUpElement.timeoutId = null;
      }, 1500);

    
      updateCartQuatity(productId, Number(quantitySelector.value));
      console.log(cart);

      calculateCartQuantity();

      saveToStorage();
    });
  });
}

renderAmazonPage();
