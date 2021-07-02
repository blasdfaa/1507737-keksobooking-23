import { disableFilterForm } from './map-filter.js';

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
        onSuccess('Ваше объявление<br>успешно размещено!');
      } else {
        onFailure('Ошибка размещения объявления');
      }
    })
    .catch(() => onFailure('Не удалось отправить форму. Попробуйте ещё раз'));
};

export const getData = (onSuccess, onFailure) => {
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
    .then((offers) => onSuccess(offers))
    .catch(() => {
      onFailure(),
      disableFilterForm();
    });
};

