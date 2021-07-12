import { createCard } from './offer-card.js';
import { activateForm, disableForm, сompleteAddressInput } from './form.js';
import { activateFilterForm, disableFilterForm, getFilterData } from './map-filter.js';
import { shuffleArray } from './utils.js';
import { debounce } from './utils.js';
import { openAlert } from './alert.js';
import { fetchDataOffers } from './api.js';

const RERENDER_DELAY = 500;
const DEFAULT_COUNT_OF_MARKER = 10;
const MARKER_ICON_WIDTH = 40;
const MARKER_ICON_HEIGHT = 40;
const MARKER_ICON_ANCHOR_X = 20;
const MARKER_ICON_ANCHOR_Y = 40;

const filterForm = document.querySelector('.map__filters');

disableForm();
disableFilterForm();

const defaultMapSettings = {
  coords: {
    LAT: 35.65160,
    LNG: 139.74908,
  },
  MAP_ZOOM: 10,
  MARKER_ICON: L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  }),
};

const defaultMarker = L.marker(
  {
    lat: defaultMapSettings.coords.LAT,
    lng: defaultMapSettings.coords.LNG,
  },
  {
    draggable: true,
    icon: defaultMapSettings.MARKER_ICON,
  },
);

export const setCoordsOnInput = () => {
  сompleteAddressInput(`${defaultMapSettings.coords.LAT}, ${defaultMapSettings.coords.LNG}`);

  defaultMarker.on('drag', (evt) => {
    const { lat, lng } = evt.target.getLatLng();

    сompleteAddressInput(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
  });

};

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm(),
    setCoordsOnInput();
  })
  .setView({
    lat: defaultMapSettings.coords.LAT,
    lng: defaultMapSettings.coords.LNG,
  }, defaultMapSettings.MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

defaultMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

export const createMarker = (offerData) => {
  markerGroup.clearLayers();

  offerData.forEach(({ author, offer, location }) => {
    const { lat, lng } = location;
    const markerIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [MARKER_ICON_WIDTH, MARKER_ICON_HEIGHT],
      iconAnchor: [MARKER_ICON_ANCHOR_X, MARKER_ICON_ANCHOR_Y],
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: markerIcon,
        riseOnHover: true,
        closePopupOnClick: false,
      },
    );
    marker.addTo(markerGroup).bindPopup(
      createCard(author, offer),
      {
        keepInView: true,
      },
    );
  });
};

export const renderCards = (offerData) => {
  const cardData = shuffleArray(offerData).slice(0, DEFAULT_COUNT_OF_MARKER);
  createMarker(cardData);

  const applyFilter = () => {
    const currentFilter = getFilterData(cardData);
    createMarker(currentFilter);
  };

  filterForm.addEventListener('change', debounce(applyFilter, RERENDER_DELAY));
};

export const loadMarkersOnMap = () => {
  fetchDataOffers(
    (offers) => {
      renderCards(offers);
      activateFilterForm();
    },
    () => openAlert('error', 'Ошибка при загрузке объявлений'),
  );
};

loadMarkersOnMap();

export const returnMarkerOnDefault = () => {
  defaultMarker.setLatLng({
    lat: defaultMapSettings.coords.LAT,
    lng: defaultMapSettings.coords.LNG,
  });

  map.setView({
    lat: defaultMapSettings.coords.LAT,
    lng: defaultMapSettings.coords.LNG,
  }, defaultMapSettings.MAP_ZOOM);
};
