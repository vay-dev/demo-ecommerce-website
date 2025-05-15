export const cart = [];

export function updateCartQuatity(productId, selectedQuantity) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId)

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    })
  }

}

export function calculateCartQuantity() {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  })

  localStorage.setItem('cartQuantity', JSON.stringify(totalQuantity));

  document.querySelector('.js-cart-quantity').innerText = totalQuantity;

}

function saveToStorage() {

}