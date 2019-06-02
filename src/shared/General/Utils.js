import * as moment from 'moment';

export class Utils {

  // FORMAT DATE
  static formatDate(date, originalFormat = 'YYYY-MM-DD', newFormat = 'DD/MM/YYYY') {
    return moment(date, originalFormat).format(newFormat);
  }


  // CAPITALIZE FIRST LETTER
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // CAPITALIZE TEXT
  static capitalizeText(text) {
    return text.toLowerCase().replace(/\b./g, function(value) {
      return value.toUpperCase();
    });
  }


  // LIMIT WORDS
  static limitWords(text, numberOfWords) {
    return text.split(' ').splice(0, numberOfWords).join(' ');
  }


  // SET INPUT CLASS NAME
  static setInputClassName(field, customClassNames = []) {
    const classList = ['form-control', ...customClassNames];

    if (field && field.$touched && field.$invalid) classList.push('is-invalid');

    return classList;
  }

}

export default Utils;
