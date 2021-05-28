const getRandomNumber = (min, max) => {
  if (min < 0 && max > 0) {
    return 'Числа не должны быть отрициательными!';
  } else if (max < min) {
    return 'Максимальное число не должно быть меньше минимального!';
  }

  const result = min + Math.random() * (max + 1 - min);
  return Math.floor(result);
};

const getFractionalNumber = (min, max, range) => {
  if (min < 0 && max > 0) {
    return 'Числа не должны быть отрициательными!';
  } else if (max < min) {
    return 'Максимальное число не должно быть меньше минимального!';
  }

  const result = min + Math.random() * (max + 1 - min);
  return result.toFixed(range);
};

getRandomNumber(1, 3);
getFractionalNumber(1.1, 3.5, 1);
