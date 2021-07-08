import { isEscEvent, isOutsideEvent } from './utils.js';

const SUCCESS_ALERT_SHOW_TIME = 2000;
const FAILURE_ALERT_SHOW_TIME = 5000;


export const openSuccessAlert = () => {
  const alertTemplate = document.querySelector('#success').content.querySelector('.success');
  const alertEl = alertTemplate.cloneNode(true);

  document.body.append(alertEl);

  const closeAlert = (evt) => {
    if (isEscEvent(evt)) {
      alertEl.remove();
    }

    if (isOutsideEvent(evt)) {
      alertEl.remove();
    }
  };

  window.addEventListener('click', closeAlert);
  window.addEventListener('keydown', closeAlert);

  setTimeout(() => {
    alertEl.remove();

    window.removeEventListener('click', closeAlert);
    window.removeEventListener('keydown', closeAlert);
  }, SUCCESS_ALERT_SHOW_TIME);
};

export const openFailureAlert = (message) => {
  const alertTemplate = document.querySelector('#error').content.querySelector('.error');
  const alertEl = alertTemplate.cloneNode(true);

  alert.querySelector('.error__message').innerHTML = message;
  document.body.append(alertEl);

  const closeAlert = (evt) => {
    if (isEscEvent(evt)) {
      alertEl.remove();
    }

    if (isOutsideEvent(evt)) {
      alertEl.remove();
    }
  };

  window.addEventListener('click', closeAlert);
  window.addEventListener('keydown', closeAlert);

  setTimeout(() => {
    alertEl.remove();

    window.removeEventListener('click', closeAlert);
    window.removeEventListener('keydown', closeAlert);
  }, FAILURE_ALERT_SHOW_TIME);
};

