import { closeOnOutsideClick, closeOnEsc } from './utils.js';

const SUCCESS_ALERT_SHOW_TIME = 2000;
const FAILURE_ALERT_SHOW_TIME = 5000;


export const openSuccessAlert = () => {
  const alertSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  const alertSuccess = alertSuccessTemplate.cloneNode(true);

  document.body.append(alertSuccess);

  window.addEventListener('click', (evt) => closeOnOutsideClick(evt, alertSuccess));
  window.addEventListener('keydown', (evt) => closeOnEsc(evt, alertSuccess));

  setTimeout(() => {
    alertSuccess.remove();
  }, SUCCESS_ALERT_SHOW_TIME);
};

export const openFailureAlert = (message) => {
  const alertFailureTemplate = document.querySelector('#error').content.querySelector('.error');
  const alertFailure = alertFailureTemplate.cloneNode(true);

  alertFailure.querySelector('.error__message').innerHTML = message;

  document.body.append(alertFailure);

  window.addEventListener('click', (evt) => closeOnOutsideClick(evt, alertFailure));
  window.addEventListener('keydown', (evt) => closeOnEsc(evt, alertFailure));

  setTimeout(() => {
    alertFailure.remove();
  }, FAILURE_ALERT_SHOW_TIME);
};
