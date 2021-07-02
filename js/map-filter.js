import { getData } from './api.js';
import { openFailureAlert } from './alert.js';
import { markerGroup, createMarker } from './map.js';

const filterForm = document.querySelector('.map__filters');
const filterFormElements = Array.from(filterForm.children);

let sortOffers = '';

filterForm.addEventListener('change', (evt) => {
  const target = evt.target;

  if (target && target.matches('#housing-type')) {
    markerGroup.clearLayers();
    sortOffers = ({ offer }) => offer.type === `${target.value}`;
    getData(
      createMarker,
      openFailureAlert,
    );
  }

  if (target && target.matches('#housing-price')) {
    markerGroup.clearLayers();
    getData(
      createMarker,
      openFailureAlert,
    );
  }

  if (target && target.matches('#housing-rooms')) {
    // console.log(evt.target.value);
  }

  if (target && target.matches('#housing-guests')) {
    // console.log(evt.target.value);
  }

  if (target && target.matches('#housing-features input[type=checkbox]')) {
    // console.log(evt.target.value);
  }
});

export const disableFilterForm = () => {
  filterForm.classList.add('map__filters--disable');
  filterFormElements.forEach((element) => element.disabled = true);
};

export const activateForm = () => {
  filterForm.classList.remove('ad-form--disable');
  filterFormElements.forEach((element) => element.disabled = false);
};

export { sortOffers };
