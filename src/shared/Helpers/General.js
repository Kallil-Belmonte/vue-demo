import { PROJECT_TITLE } from '../Files/Consts';

// SET PAGE TITLE
export const setPageTitle = (title) => {
  document.title = `${PROJECT_TITLE} | ${title}`;
};


// GROUP ARRAY ITEMS IN ARRAYS
export const groupArrayItemsInArrays = (array, itemsQuantity, repeatLastItem) => {
  const matrix = [[]];

  if (repeatLastItem && itemsQuantity > 1) {
    let counter = 0;
    let startSlice = 0;
    let endSlice = itemsQuantity;

    while (counter <= array.length) {
      const lastIndex = matrix.length - 1;

      if (!matrix[lastIndex].length) {
        matrix[lastIndex].push(...array.slice(startSlice, endSlice));

        const ultimoItem = matrix[matrix.length - 1];
        const ultimoItemLastIndex = ultimoItem.length - 1;

        startSlice = array.findIndex(item => item === ultimoItem[ultimoItemLastIndex]);
        endSlice = startSlice + itemsQuantity;

        if (ultimoItem.length < itemsQuantity) {
          break;
        }

        matrix.push([]);
      }

      counter += 1;
    }
  } else {
    array.forEach(item => {
      const lastIndex = matrix.length - 1;

      if (matrix[lastIndex].length < itemsQuantity) {
        matrix[lastIndex].push(item);
      } else {
        matrix.push([]);
        matrix[matrix.length - 1].push(item);
      }
    });
  }

  return matrix;
};


// SET FIELD CLASS NAME
export const setFieldClassName = (field, customClassNames = []) => {
  const classList = ['form-control', ...customClassNames];

  if (field && field.$touched && field.$invalid) classList.push('is-invalid');

  return classList;
};


// CLEAR FORM MESSAGE
export const clearFormMessage = (field, index) => {
  field.splice(index, 1)
};
