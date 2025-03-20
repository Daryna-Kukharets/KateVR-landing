const order = document.querySelector('.count__box');
const country = document.querySelector('.countries__box');
const city = document.querySelector('.city__box');

const countSelect = document.querySelector('.count__select');
const countList = document.querySelector('.count__list');
const countItems = document.querySelectorAll('.count__item');
const amount = document.querySelector('.order__amount');

const countriesSelect = document.querySelector('.countries__select');
const countriesList = document.querySelector('.countries__list');
const countriesItems = document.querySelectorAll('.countries__item');

const citySelect = document.querySelector('.city__select');
const cityList = document.querySelector('.city__list');
const cityItems = document.querySelectorAll('.city__item');
const cityLabel = document.querySelector('.form__label-city');

export function closeDropdown() {
  document.addEventListener('click', (e) => {
    if (!order.contains(e.target)) {
      countList.classList.remove('count__list--active');
    }

    if (!country.contains(e.target)) {
      countriesList.classList.remove('countries__list--active');
    }

    if (!city.contains(e.target)) {
      cityList.classList.remove('city__list--active');

      if (citySelect.textContent.length === 0) {
        cityLabel.style.color = '';
      }
    }
  });

  order.addEventListener('click', () => {
    countList.classList.toggle('count__list--active');
  });

  country.addEventListener('click', () => {
    countriesList.classList.toggle('countries__list--active');
    const label = document.querySelector('.form__label-country');
    label.style.color = '#05c2df';
  });

  city.addEventListener('click', () => {
    cityList.classList.toggle('city__list--active');
    cityLabel.style.color = '#05c2df';
  });
}

export function chooseSelect() {
  countItems.forEach((item) =>
    item.addEventListener('click', () => {
      chooseSelectHandler(item, 'count', countSelect, countList);

      amount.textContent = `${+item.textContent * 1200}$`;
    }),
  );

  countriesItems.forEach((country) =>
    country.addEventListener('click', () => {
      chooseSelectHandler(country, 'countries', countriesSelect, countriesList);
    }),
  );

  cityItems.forEach((city) =>
    city.addEventListener('click', () => {
      chooseSelectHandler(city, 'city', citySelect, cityList);
    }),
  );
}

function chooseSelectHandler(chosenItem, className, select, list) {
  const itemActive = document.querySelector(`.${className}__item--active`);

  if (itemActive) {
    itemActive.classList.remove(`${className}__item--active`);
  }

  chosenItem.classList.add(`${className}__item--active`);
  select.textContent = chosenItem.textContent;
  list.classList.remove(`${className}__list--active`);
}
