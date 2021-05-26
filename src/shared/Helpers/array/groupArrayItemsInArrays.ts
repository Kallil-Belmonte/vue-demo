/**
 * groupArrayItemsInArrays
 * @param { any[] } array
 * @param { number } itemsQuantity
 * @param { boolean } repeatLastItem
 */

const groupArrayItemsInArrays = (
  array: any[],
  itemsQuantity: number,
  repeatLastItem?: boolean,
): [any[]] => {
  const matrix: [any[]] = [[]];

  if (repeatLastItem && itemsQuantity > 1) {
    let counter: number = 0;
    let startSlice: number = 0;
    let endSlice: number = itemsQuantity;

    while (counter <= array.length) {
      const lastIndex: number = matrix.length - 1;

      if (!matrix[lastIndex].length) {
        matrix[lastIndex].push(...array.slice(startSlice, endSlice));

        const ultimoItem: any = matrix[matrix.length - 1];
        const ultimoItemLastIndex: number = ultimoItem.length - 1;

        startSlice = array.findIndex((item) => item === ultimoItem[ultimoItemLastIndex]);
        endSlice = startSlice + itemsQuantity;

        if (ultimoItem.length < itemsQuantity) {
          break;
        }

        matrix.push([]);
      }

      counter += 1;
    }
  } else {
    array.forEach((item) => {
      const lastIndex: number = matrix.length - 1;

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

export default groupArrayItemsInArrays;
