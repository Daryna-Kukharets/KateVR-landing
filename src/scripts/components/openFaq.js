const questions = document.querySelectorAll('.faq__section');
const iconClose = document.querySelector('.menu__close');

export function openFaq() {
  questions.forEach((question) => {
    question.addEventListener('click', () => {
      const wrapper = question.closest('.faq__section');
      const info = wrapper.querySelector('.faq__info');

      const close = wrapper.querySelector('.faq__close');
      const open = wrapper.querySelector('.faq__open');

      if (info.classList.contains('faq__info--active')) {
        info.classList.remove('faq__info--active');
        close.style.display = 'block';
        open.style.display = 'none';
      } else {
        closeActiveQuestion();

        info.classList.add('faq__info--active');
        open.style.display = 'block';
        close.style.display = 'none';
      }
    });
  });

  iconClose.addEventListener('click', closeActiveQuestion);
}

function closeActiveQuestion() {
  const activeQuestion = document.querySelector('.faq__info--active');
  if (activeQuestion) {
    activeQuestion.classList.remove('faq__info--active');
  }
}
