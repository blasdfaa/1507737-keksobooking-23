const getRandomNumber = (min, max) => {
  const result = Math.floor(min + Math.random() * (max + 1 - min));
  return Math.abs(result);
};

const getRandomPositiveFloat = (min, max, float = 1) => {
  const result = Math.abs(Math.random() * (max - min) + min);
  return result.toFixed(float);
};

const getRandomArrayElement = (arr) => arr[getRandomNumber(0, arr.length - 1)];

const mixedArray = (arr) => {
  const copyArray = arr.slice();
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }
  return copyArray;
};

const getRandomArray = (arr) => {
  const newArray = mixedArray(arr);
  return newArray.slice(0, getRandomNumber(1, newArray.length));
};

const hideBlock = (block) => block.classList.add('hidden');

export { getRandomNumber, getRandomPositiveFloat, getRandomArrayElement, getRandomArray, hideBlock };
