const getRandomNumber = (min, max) => {
  const result = Math.floor(min + Math.random() * (max + 1 - min));
  return Math.abs(result);
};

export const getRandomPositiveFloat = (min, max, float = 1) => {
  const result = Math.abs(Math.random() * (max - min) + min);
  return result.toFixed(float);
};

export const getRandomArrayElement = (arr) => arr[getRandomNumber(0, arr.length - 1)];

export const mixedArray = (arr) => {
  const copyArray = arr.slice();
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }
  return copyArray;
};

export const getRandomArray = (arr) => {
  const newArray = mixedArray(arr);
  return newArray.slice(0, getRandomNumber(1, newArray.length));
};

export const hideBlock = (block) => block.classList.add('hidden');

export const maxLengthCheck = (input) => {
  if (input.value.length > input.maxLength) {
    input.value = input.value.slice(0, input.maxLength);
  }
};

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const isOutsideEvent = (evt) => !evt.target.matches('html');

export const debounce = (cb, delay) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, delay);
  };
};

export const setFilePreview = (fileInput, imgElement, typeOptions) => {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();

    const isFormatValid = typeOptions.some((item) => fileName.endsWith(item));

    if (isFormatValid) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        imgElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};
