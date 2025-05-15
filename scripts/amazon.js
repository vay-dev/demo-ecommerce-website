import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import {cart, updateCartQuatity, calculateCartQuantity} from "../data/cart.js"
//END OF IMPORTS AREA

function renderAmazonPage() {
  let productsHTML = ``

  products.forEach((product) => {
    productsHTML += `
         <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${Math.round(product.rating.stars * 10)}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
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
    `
  });

  document.querySelector('.js-product-grid').innerHTML = productsHTML;

  const savedQuantity = JSON.parse(localStorage.getItem('totalQuantity'));
  if (savedQuantity) {
    document.querySelector('.js-cart-quantity').innerText = savedQuantity;
  }

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

  let totalQuantity = calculateCartQuantity();

  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
  localStorage.setItem('cart', JSON.stringify(cart))


});


  });
}

renderAmazonPage();