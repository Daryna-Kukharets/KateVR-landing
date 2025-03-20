export function moveLabel() {
  document.querySelectorAll('.form__input').forEach((input) => {
    input.addEventListener('input', function () {
      const label = this.nextElementSibling;
      if (this.value) {
        label.classList.add('filled');
      } else {
        label.classList.remove('filled');
      }
    });
  });
}
