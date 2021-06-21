import { getRandomNumber, getRandomPositiveFloat, getRandomArrayElement, getRandomArray } from './utils.js';

const NUMBER_OF_OBJECTS = 10;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 8;
const MIN_LOCATION_LAT = 35.65000;
const MAX_LOCATION_LAT = 35.70000;
const MIN_LOCATION_LNG = 139.70000;
const MAX_LOCATION_LNG = 139.80000;
const CHECK_IN = ['12:00', '13:00', '14:00'];
const CHECK_OUT = ['12:00', '13:00', '14:00'];
const TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getAuthorData = () => ({
  avatar: `img/avatars/user0${getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.png`,
});

const getOfferData = () => ({
  title: 'Милая, уютная квартирка в центре Токио',
  address: `${getRandomPositiveFloat(MIN_LOCATION_LAT, MAX_LOCATION_LAT, 5)}, ${getRandomPositiveFloat(MIN_LOCATION_LNG, MAX_LOCATION_LNG, 5)}`,
  price: getRandomNumber(1, 10000),
  type: getRandomArrayElement(TYPE_HOUSE),
  rooms: getRandomNumber(1, 10),
  guests: getRandomNumber(1, 7),
  checkin: getRandomArrayElement(CHECK_IN),
  checkout: getRandomArrayElement(CHECK_OUT),
  features: getRandomArray(FEATURES),
  description: 'Апартаменты Asakusa Shinobi House расположены в 400 м от храма Сэнсо-дзи и в 1 км от телевизионной башни Tokyo Skytree. К услугам гостей оформленные в японском стиле апартаменты в традиционном японском стиле.',
  photos: getRandomArray(PHOTOS),
});

const getLocationData = () => ({
  lat: getRandomPositiveFloat(MIN_LOCATION_LAT, MAX_LOCATION_LAT, 5),
  lng: getRandomPositiveFloat(MIN_LOCATION_LNG, MAX_LOCATION_LNG, 5),
});

const getOfferObj = () => ({
  author: getAuthorData(),
  offer: getOfferData(),
  location: getLocationData(),
});

const createOffersArray = () => new Array(NUMBER_OF_OBJECTS).fill('').map(() => getOfferObj());

export { createOffersArray, getOfferData, getLocationData };
