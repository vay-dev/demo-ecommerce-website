import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { cart, calculateCartQuantity, saveToStorage } from '../../data/cart.js';
import { getProduct, products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

const today = dayjs();
console.log(today.format('dddd, MM, DD'));

export function renderOrderSummary() {
  let cartSummaryHTML = '';

cart.map((cartItem) => {

    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    


  cartSummaryHTML += `
            <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">(${cartItem.quantity})</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Edit
                  </span>
                  
                 <span class="quantity-manipulator manipulator">
                    <input class="add-value" min="1" type="number"> <span class="add element" data-product-id="${cartItem.productId}">Add</span>
                    <input min="1" class="remove-value" type="number"> <span class="delete element" data-product-id="${cartItem.productId}">delete</span>

                    <span class="icon__container" title="close"><i class='bx bx-x icons__container__child'></i></span>
                 </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `

});
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
calculateCartQuantity();
//BREAKPOINT

document.querySelectorAll('.link-primary').forEach((link) => {

  link.addEventListener('click', () => {

    const parentContainer = link.closest('.cart-item-container');
    const manipulator = parentContainer.querySelector('.manipulator');
    const addLink = parentContainer.querySelector('.add');
    const deleteLink = parentContainer.querySelector('.delete');
    const globalElement = parentContainer.querySelector('.element');
    const productId = globalElement.dataset.productId;
    const closeElement = parentContainer.querySelector('.icon__container');

    link.classList.add('hidden');
    manipulator.classList.add('visible');

    addLink.addEventListener('click', () => {
      const aValue = Number(parentContainer.querySelector('.add-value').value);
      const matchingProduct = cart.find(cartItem => cartItem.productId === productId);

      if (matchingProduct) {
        matchingProduct.quantity += aValue;
        saveToStorage();
        renderOrderSummary();
      } else {
        alert('Error!');
      }

    });  


    deleteLink.addEventListener('click', () => {
      const dValue = Number(parentContainer.querySelector('.remove-value').value);
      const matchingItem = cart.find(cartItem => cartItem.productId === productId);

      if (isNaN(dValue) || dValue < 1) {
        alert('Please enter a valid number greater than 0');
        return;
      }

      if (matchingItem) {
        matchingItem.quantity -= dValue;

        if (matchingItem.quantity <= 0) {
          const index = cart.indexOf(matchingItem);
          if (index > -1) {
            cart.splice(index, 1);
          }
        }

        saveToStorage();
        renderOrderSummary();
      } else {
        alert('Error: Item not found in cart');
      }
      
    });


    closeElement.addEventListener('click', () => {
      if (manipulator.classList.contains('visible')) {
        manipulator.classList.remove('visible');
        link.classList.remove('hidden');
      }
    });
    
  });
});

//BREAKPOINT

}
