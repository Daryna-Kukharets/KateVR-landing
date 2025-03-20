const orderForm = document.querySelector('.order__form');
const payForm = document.querySelector('.pay__form');
const complete = document.querySelector('.complete');
const orderStages = document.querySelectorAll('.order__item');
const orderLogo = document.querySelector('.order__logo');
const orderClose = document.querySelector('.order__close');
const completeButton = document.querySelector('.complete__button');
const imageBox = document.querySelector('.order__main-desktop');

export function closeOrder() {
  orderLogo.addEventListener('click', closeOrderHandler);
  orderClose.addEventListener('click', closeOrderHandler);
  completeButton.addEventListener('click', closeOrderHandler);
}

function closeOrderHandler() {
  orderForm.classList.add('order__form--active');
  payForm.classList.remove('pay__form--active');
  complete.classList.remove('complete--active');
  imageBox.classList.add('order__main-desktop--active');
  orderStages[0].classList.add('order__item--active');
  orderStages[1].classList.remove('order__item--active');
  orderStages[2].classList.remove('order__item--active');
}
