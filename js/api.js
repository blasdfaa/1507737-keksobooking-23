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
      } else {
        onFailure();
      }
    })
    .catch(() => onFailure());
};

export const fetchDataOffers = (onSuccess, onFailure) => {
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
      } else {
        onFailure();
      }
    })
    .then((offers) => onSuccess(offers))
    .catch(() => onFailure());
};

