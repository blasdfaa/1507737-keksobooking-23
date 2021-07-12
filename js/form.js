import { openAlert } from './alert.js';
import { postData } from './api.js';
import { resetFileInputs } from './file-preview.js';
import { resetFilterForm } from './map-filter.js';
import { loadMarkersOnMap, returnMarkerOnDefault } from './map.js';
import { checkMaxLength } from './utils.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const typeCategoryPriceValue = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};
const ROOM_CAPACITY_VALUES = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const adForm = document.querySelector('.ad-form');
const adFormElements = [...adForm.children];

const titleInput = adForm.querySelector('#title');
const houseTypeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const addressInput = adForm.querySelector('#address');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

// Заголовок объявления

const onTitleInputValid = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Осталось еще ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Превышен лимит символов на ${valueLength - MAX_TITLE_LENGTH}`);
  } else {
    titleInput.setCustomValidity('');
  }
};

const onPriceInputValid = () => {
  checkMaxLength(priceInput);
};

const onHouseTypeSelectSetPrice = (evt) => {
  const target = evt.target;

  priceInput.min = typeCategoryPriceValue[target.value.toUpperCase()];
  priceInput.placeholder = typeCategoryPriceValue[target.value.toUpperCase()];
};

export const сompleteAddressInput = (coords) => {
  if (coords) {
    addressInput.value = coords;
  }
};

const onTimeInSelectChange = (evt) => {
  const target = evt.target;

  timeOutSelect.value = target.value;
};

const onTimeOutSelectChange = (evt) => {
  const target = evt.target;

  timeInSelect.value = target.value;
};

const onNumberRoomsSelectChange = (evt) => {
  const target = evt.target;
  const capacitySelectItems = capacitySelect.querySelectorAll('option');

  capacitySelectItems.forEach((item) => {
    item.disabled = true;
  });

  ROOM_CAPACITY_VALUES[target.value].forEach((item) => {
    capacitySelect.querySelector(`option[value="${item}"]`).disabled = false;
    capacitySelect.value = item;
  });
};

export const resetAdForm = () => {
  adForm.reset();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  postData(
    () => {
      resetAdForm(),
      resetFilterForm(),
      returnMarkerOnDefault(),
      loadMarkersOnMap(),
      resetFileInputs(),
      openAlert('success');
    },
    () => openAlert('error', 'Ошибка размещения объявления'),
    new FormData(adForm),
  );
});

const addFormEventListeners = () => {
  titleInput.addEventListener('input', onTitleInputValid);
  priceInput.addEventListener('input', onPriceInputValid);
  houseTypeSelect.addEventListener('change', onHouseTypeSelectSetPrice);
  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);
  roomNumberSelect.addEventListener('change', onNumberRoomsSelectChange);
};

const removeFormEventListeners = () => {
  titleInput.removeEventListener('input', onTitleInputValid);
  priceInput.removeEventListener('input', onPriceInputValid);
  houseTypeSelect.removeEventListener('change', onHouseTypeSelectSetPrice);
  timeInSelect.removeEventListener('change', onTimeInSelectChange);
  timeOutSelect.removeEventListener('change', onTimeOutSelectChange);
  roomNumberSelect.removeEventListener('change', onNumberRoomsSelectChange);
};

export const disableForm = () => {
  adForm.classList.add('ad-form--disable');

  adFormElements.forEach((element) => {
    element.disabled = true;
  });

  removeFormEventListeners();
  сompleteAddressInput();
};

export const activateForm = () => {
  adForm.classList.remove('ad-form--disable');

  adFormElements.forEach((element) => {
    element.disabled = false;
  });

  addFormEventListeners();
  сompleteAddressInput();
};
