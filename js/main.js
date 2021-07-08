import './file-preview.js';
import { fetchDataOffers } from './api.js';
import { renderCards } from './map.js';
import { openSuccessAlert } from './alert.js';

fetchDataOffers((offers) => {
  renderCards(offers);
});

openSuccessAlert();
