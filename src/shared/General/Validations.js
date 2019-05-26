const minLength = (min) => (value) => value && value.length < min;
const maxLength = (max) => (value) => value && value.length;

class Validations {
  static required = (value) => !value;

  static minLength3 = minLength(3);

  static minLength5 = minLength(5);

  static maxLength15 = maxLength(15);

  static email = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  static number = (value) => value && isNaN(Number(value));

  static alphaNumeric = (value) => value && /[^a-zA-Z0-9 ]/i.test(value);
}

export default Validations;
