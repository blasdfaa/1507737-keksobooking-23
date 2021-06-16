import { renderCardsList } from './similar-cards.js';

const mapBlock = document.querySelector('.map__canvas');
const mapItems = renderCardsList;

mapBlock.appendChild(mapItems);
