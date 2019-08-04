import * as moment from 'moment';

export class Utils {

  // SET PAGE TITLE
  static setPageTitle(title) {
    document.title = `Vue Demo | ${title}`;
  }


  // CAPITALIZE FIRST LETTER
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // CAPITALIZE TEXT
  static capitalizeText(text) {
    return text.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }


  // LIMIT WORDS
  static limitWords(text, numberOfWords) {
    return text.split(' ').splice(0, numberOfWords).join(' ');
  }


  // GROUP ARRAY ITEMS
  static groupArrayItems(array, itemsQuantity) {
    const newArray = [[]];

    array.forEach(item => {
      const lastIndex = newArray.length - 1;

      if (newArray[lastIndex].length < itemsQuantity) {
        newArray[lastIndex].push(item);
      } else {
        newArray.push([]);
        newArray[newArray.length - 1].push(item);
      }
    });

    return newArray;
  }


  // CLEAR FORM MESSAGE
  static clearFormMessage(field, index) {
    field.splice(index, 1);
  }


  // SET INPUT CLASS NAME
  static setInputClassName(field, customClassNames = []) {
    const classList = ['form-control', ...customClassNames];

    if (field && field.$touched && field.$invalid) classList.push('is-invalid');

    return classList;
  }

}

export default Utils;
