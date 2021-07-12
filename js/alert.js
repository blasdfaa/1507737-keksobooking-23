import { isEscEvent, isOutsideEvent } from './utils.js';

export const openAlert = (type, message) => {
  const alertTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const alert = alertTemplate.cloneNode(true);

  if (type === 'error') {
    alert.querySelector('.error__message').textContent = message;
  }

  document.body.append(alert);

  const closeAlertHandler = (evt) => {
    if (isEscEvent(evt)) {
      alert.remove();
    }

    if (isOutsideEvent(evt)) {
      alert.remove();
    }

    window.removeEventListener('click', closeAlertHandler);
    window.removeEventListener('keydown', closeAlertHandler);
  };

  window.addEventListener('click', closeAlertHandler);
  window.addEventListener('keydown', closeAlertHandler);
};
