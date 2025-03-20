const langButton = document.querySelector('.select__button');
const langList = document.querySelector('.select__list');
const langItems = document.querySelectorAll('.select__item');
const languageItems = document.querySelectorAll('.nav__language');

export function changeLang() {
  langItems.forEach((item) => {
    item.addEventListener('click', () => {
      changeLangHandler(item);

      const languageItemChosen = findChosenLang([...languageItems], item);

      if (languageItemChosen) {
        resetActiveLinks();
        languageItemChosen
          .querySelector('.nav__link')
          .classList.add('nav__link--active');
      }
    });
  });

  languageItems.forEach((item) => {
    item.addEventListener('click', () => {
      changeLangHandler(item);

      const langItemChosen = findChosenLang([...langItems], item);

      if (langItemChosen) {
        resetActiveLinks();
        item.querySelector('.nav__link').classList.add('nav__link--active');
        langItemChosen.classList.add('select__item--active');
      }
    });
  });
}

function changeLangHandler(langItem) {
  const langItemActive = document.querySelector('.select__item--active');

  if (langItemActive) {
    langItemActive.classList.remove('select__item--active');
  }

  langItem.classList.add('select__item--active');
  langButton.textContent = langItem.dataset.lang;
  langList.classList.remove('select__list--active');
}

function findChosenLang(languages, choseLang) {
  return languages.find((item) => {
    return item.dataset.lang === choseLang.dataset.lang;
  });
}

function resetActiveLinks() {
  document.querySelectorAll('.nav__link--active').forEach((link) => {
    link.classList.remove('nav__link--active');
  });
}
