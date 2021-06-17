import { createOffersArray } from './mock-data.js';
import { renderCardsList } from './similar-cards.js';

const mapBlock = document.querySelector('.map__canvas');
const mapItems = renderCardsList(createOffersArray());

mapBlock.appendChild(mapItems);
