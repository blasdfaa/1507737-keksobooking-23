const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const NUMBER_OF_OBJECTS = 10;

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
  arr.forEach((item) => {
    const temp = item;
    const randomEl = getRandomArrayElement(arr);

    item = arr[randomEl];
    arr[randomEl] = temp;
  });
  return arr;
};

const getRandomArray = (arr) => {
  const newArray = mixedArray(arr);
  const result = newArray.slice(0, getRandomNumber(1, newArray.length));
  return result;
};

const getAvatarUrl = () => `img/avatars/user0${getRandomNumber(1, 8)}.png`;

const createOfferData = () => ({
  author: {
    avatar: getAvatarUrl(),
  },
  offer: {
    title: 'Милая, уютная квартирка в центре Токио',
    address: `${getRandomNumber(1, 110)}, ${getRandomNumber(11, 222)}`,
    price: getRandomNumber(1, 10),
    type: 'palace',
    rooms: getRandomNumber(1, 5),
    guests: getRandomNumber(1, 7),
    checkin: '12:00',
    checkout: '13:00',
    features: getRandomArray(FEATURES),
    description: 'Продается теплая, солнечная, очень светлая 3-комнатная квартира, которая находится на 8 этаже 12этажного дома; дом имеет 2 входа с разных сторон.',
    photos: getRandomArray(PHOTOS),
    location: {
      lat: getRandomPositiveFloat(35.65, 35.70, 5),
      lng: getRandomPositiveFloat(139.70, 139.80, 5),
    },
  },
});

const createOffer = new Array(NUMBER_OF_OBJECTS).fill(null).map(() => createOfferData());

createOffer;
