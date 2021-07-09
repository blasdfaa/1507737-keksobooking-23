import { adFormReset } from './form.js';

export const postData = (onSuccess, onFailure, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      body,
    },
  )
    .then((res) => {
      if (res.ok) {
        onSuccess();
        adFormReset();
      } else {
        onFailure('Ошибка размещения объявления');
      }
    })
    .catch(() => onFailure('Не удалось отправить форму. Попробуйте ещё раз'));
};

export const fetchDataOffers = (onSuccess) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`${res.status} ${res.statusText}`);
    })
    .then((offers) => onSuccess(offers));
};

