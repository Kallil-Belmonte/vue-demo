export class ThemeFunctions {

  // TOGGLE MODAL STYLES
  static toggleModalStyles(isModalOpen) {
    if (isModalOpen) {
      document.querySelector('body').removeAttribute('class');
      document.querySelector('body').removeAttribute('style');
    } else {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth;

      document.querySelector('body').classList.add('modal-open');
      document.querySelector('body, .modal-open .modal').style.paddingRight = scrollbarWidth.toString() + 'px';
    }
  }

}

export default ThemeFunctions;
