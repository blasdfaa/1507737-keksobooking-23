import { isEscEvent, isOutsideEvent } from './utils.js';

let ALERT_SHOW_TIME = 2000;

export const openAlert = (type, message) => {
  const alertTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const alert = alertTemplate.cloneNode(true);

  if (type === 'error') {
    alert.querySelector('.error__message').textContent = message;

    ALERT_SHOW_TIME = 5000;
  }

  document.body.append(alert);

  const closeAlert = (evt) => {
    if (isEscEvent(evt)) {
      alert.remove();
    }

    if (isOutsideEvent(evt)) {
      alert.remove();
    }

    window.removeEventListener('click', closeAlert);
    window.removeEventListener('keydown', closeAlert);
  };

  window.addEventListener('click', closeAlert);
  window.addEventListener('keydown', closeAlert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};
