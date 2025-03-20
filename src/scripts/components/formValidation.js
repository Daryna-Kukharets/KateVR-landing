import IMask from 'imask';

export function formValidation() {
  const orderForm = document.querySelector('.order__form');
  const orderInputs = document.querySelectorAll('.order__input');
  const requiredOrderInputs = Array.from(orderInputs).filter(
    (input) => input.required,
  );

  const orderStages = document.querySelectorAll('.order__item');

  const citySelect = document.querySelector('.city__select');
  const labelForCity = document.querySelector('.form__label-city');
  const cityListItems = document.querySelectorAll('.city__item');

  const contactForm = document.querySelector('.form--contact');
  const contactInputs = document.querySelectorAll('.contact__input');

  const payForm = document.querySelector('.pay__form');
  const payInputs = document.querySelectorAll('.pay__input');
  const input = document.getElementById('input-card');
  const inputCardDate = document.getElementById('input-card-date');
  const inputCvv = document.getElementById('input-cvv');

  const lines = document.querySelectorAll('.pay__line');

  const imageBox = document.querySelector('.order__main-desktop');
  const complete = document.querySelector('.complete');

  const cardMask = IMask(input, {
    mask: '0000 0000 0000 0000',
  });

  const dateMask = IMask(inputCardDate, {
    mask: '00 / 00',
  });

  const cvvMask = IMask(inputCvv, {
    mask: '000',
  });

  input.addEventListener('input', () => {
    const cursorPosition = input.value.replace(/\s/g, '').length;
    const activeGroup = Math.ceil(cursorPosition / 4);

    lines.forEach((line, index) => {
      line.classList.toggle('active', index + 1 === activeGroup);
    });
  });

  function errorAction(input, label, message) {
    input.classList.add('form__input--error');
    label.classList.add('form__placeholder--error');
    label.textContent = message;
  }

  function inputValidation(input) {
    const field = input.closest('.form__input-box');

    const label = field.querySelector('.form__placeholder');

    let error = false;

    if (!input.value.trim()) {
      errorAction(
        input,
        label,
        `Please, fill your ${normalizeName(input.name)}*`,
      );
      error = true;
    } else if (input.name === 'cvv') {
      label.textContent = `${input.name.toUpperCase()}*`;
      input.classList.remove('form__input--error');
      label.classList.remove('form__placeholder--error');
    } else {
      label.textContent = `${input.name[0].toUpperCase()}${normalizeName(input.name).slice(1)}*`;
      input.classList.remove('form__input--error');
      label.classList.remove('form__placeholder--error');
    }

    if (input.name === 'email') {
      if (!input.value.trim()) {
        errorAction(input, label, 'Please, fill your email*');
        error = true;
      } else if (input.value.indexOf('@') === -1) {
        errorAction(input, label, `Incorrect format of ${input.name}`);
        error = true;
      }
    }

    if (input.name === 'phone') {
      if (!input.value.trim()) {
        errorAction(input, label, 'Please, fill your phone*');
        error = true;
      } else if (!/^[+()0-9 ]+$/.test(input.value)) {
        errorAction(input, label, 'Incorrect phone format');
        error = true;
      }
    }

    if (input.name === 'cardNumber' && input.value.length !== 19) {
      errorAction(input, label, 'Card number must be 16 digits');
      error = true;
    }

    if (input.name === 'expirationDate') {
      const [month, year] = input.value.split(' / ').map((el) => el.trim());

      if (input.value.length !== 7) {
        errorAction(input, label, 'Invalid date format');
      }

      if (month < 1 || month > 12 || year.length !== 2 || year < 25) {
        errorAction(input, label, 'Invalid expiration date');
        error = true;
      }
    }

    if (input.name === 'cvv' && input.value.length !== 3) {
      errorAction(input, label, 'CVV must be 3 digits');
      error = true;
    }

    return error;
  }

  function addBlurValidation(inputs) {
    inputs.forEach((input) => {
      input.addEventListener('blur', () => inputValidation(input));
    });
  }

  addBlurValidation(contactInputs);
  addBlurValidation(requiredOrderInputs);
  addBlurValidation(payInputs);

  cityListItems.forEach((item) => {
    item.addEventListener('click', () => {
      citySelect.textContent = item.textContent;
      labelForCity.classList.remove('form__placeholder--error');
      labelForCity.textContent = 'City*';
    });
  });

  function onSubmitContactForm(eventSubmit) {
    eventSubmit.preventDefault();
    let hasError = false;

    contactInputs.forEach((input) => {
      if (inputValidation(input)) {
        hasError = true;
      }
    });

    if (!hasError) {
      contactForm.reset();
    }
  }

  function onSubmitOrderForm(eventSubmit) {
    eventSubmit.preventDefault();
    let hasError = false;

    requiredOrderInputs.forEach((input) => {
      hasError = inputValidation(input) || hasError;
    });

    if (citySelect.textContent.length === 0) {
      labelForCity.classList.add('form__placeholder--error');
      labelForCity.textContent = 'Please, select a city*';
      hasError = true;
    } else {
      labelForCity.classList.remove('form__placeholder--error');
      labelForCity.textContent = 'City*';
    }

    if (hasError) {
      return;
    }

    orderForm.classList.remove('order__form--active');
    payForm.classList.add('pay__form--active');

    document.querySelector('.order__quantity').style.gridColumn = '2 / 3';
    document.querySelector('.order__price').style.gridColumn = '4 / 5';

    orderStages[0].classList.remove('order__item--active');
    orderStages[1].classList.add('order__item--active');
    orderStages[0].classList.add('order__stages--change');
  }

  orderStages[0].addEventListener('click', () => {
    if (payForm.classList.contains('pay__form--active')) {
      payForm.classList.remove('pay__form--active');
      orderForm.classList.add('order__form--active');
      orderStages[0].classList.add('order__item--active');
      orderStages[1].classList.remove('order__item--active');
    }
  });

  function onSubmitPayForm(eventSubmit) {
    eventSubmit.preventDefault();
    let hasError = false;

    payInputs.forEach((input) => {
      hasError = inputValidation(input) || hasError;
    });

    if (hasError) {
      return;
    }

    payForm.classList.remove('pay__form--active');
    complete.classList.add('complete--active');
    imageBox.classList.remove('order__main-desktop--active');
    orderStages[1].classList.remove('order__item--active');
    orderStages[2].classList.add('order__item--active');
    orderStages[0].classList.remove('order__stages--change');

    orderForm.reset();
    payForm.reset();
  }

  contactForm.addEventListener('submit', onSubmitContactForm);
  orderForm.addEventListener('submit', onSubmitOrderForm);
  payForm.addEventListener('submit', onSubmitPayForm);
}

function normalizeName(inputId) {
  return inputId.replace(/([A-Z])/g, ' $1').toLowerCase();
}
