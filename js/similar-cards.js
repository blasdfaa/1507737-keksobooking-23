import { createOffersArray } from './mock-data.js';

const TYPE_CATEGORY = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const makeFeatureItems = (features) => {
  const result = [];

  features.forEach((feature) => {
    result.push(`<li class="popup__feature popup__feature--${feature}"></li>`);
  });

  return result.join('');
};

const makePhotoItems = (photos) => {
  const result = [];

  photos.forEach((photo) => {
    result.push(`<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });

  return result.join('');
};


const createCardsList = (dataCard) => {
  const cardsFragment = document.createDocumentFragment();

  dataCard.forEach(({author, offer}) => {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = author.avatar;
    card.querySelector('.popup__title').textContent = offer.title;
    card.querySelector('.popup__text--address').textContent = offer.address;
    card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    card.querySelector('.popup__type').textContent = TYPE_CATEGORY[offer.type];
    card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    card.querySelector('.popup__features').innerHTML = `${makeFeatureItems(offer.features)}`;
    card.querySelector('.popup__description').textContent = offer.description;
    card.querySelector('.popup__photos').innerHTML = `${makePhotoItems(offer.photos)}`;

    cardsFragment.appendChild(card);
  });

  return cardsFragment;
};

const renderCardsList = createCardsList(createOffersArray());

export { renderCardsList };
