import './file-preview.js';
import { fetchDataOffers } from './api.js';
import { renderCards } from './map.js';

fetchDataOffers((offers) => {
  renderCards(offers);
});
