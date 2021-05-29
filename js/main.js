const getRandomNumber = (min, max) => {
  const result = Math.floor(min + Math.random() * (max + 1 - min));
  return Math.abs(result);
};

const getFractionalNumber = (min, max, range) => {
  const result = min + Math.random() * (max + 1 - min);
  return Math.abs(result.toFixed(range));
};

getRandomNumber(1, 5);
getRandomNumber(-3, 5);
getFractionalNumber(1.1, 3.5, 100);
