/**
 * limitWords
 * @param { string } value
 * @param { string } numberOfWords
 */

const limitWords = (value: string, numberOfWords: number): string => {
  if (value.split(' ').length > numberOfWords) {
    return value.split(' ').splice(0, numberOfWords).join(' ') + '...';
  }

  return value;
};

export default limitWords;
