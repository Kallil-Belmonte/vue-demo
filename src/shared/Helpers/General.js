// SET PAGE TITLE
export const setPageTitle = (title) => {
  document.title = `Vue Demo | ${title}`;
};


// GROUP ARRAY ITEMS IN ARRAYS
export const groupArrayItemsInArrays = (array, itemsQuantity) => {
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
};


// SET FIELD CLASS NAME
export const setFieldClassName = (field, customClassNames = []) => {
  const classList = ['form-control', ...customClassNames];

  if (field && field.$touched && field.$invalid) classList.push('is-invalid');

  return classList;
};


// CLEAR FIELD ERROR MESSAGE
export const clearFieldErrorMessage = (field, index) => {
  field.splice(index, 1);
};
