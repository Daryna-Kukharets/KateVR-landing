const langButton = document.querySelector('.select__button');
const langList = document.querySelector('.select__list');

export function toggleList() {
  toggleListHandler(langButton, langList, 'select__list--active');
}

function toggleListHandler(elementClick, elementList, activeClass) {
  elementClick.addEventListener('click', () => {
    elementList.classList.toggle(activeClass);
  });

  document.addEventListener('click', (event) => {
    if (
      !langButton.contains(event.target) &&
      !elementList.contains(event.target)
    ) {
      elementList.classList.remove(activeClass);
    }
  });
}
