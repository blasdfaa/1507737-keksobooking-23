import { createCard } from './offer-card.js';
import { disableForm, activateForm, сompleteAddressInput } from './form.js';
import { getFilterData } from './map-filter.js';
import { mixedArray } from './utils.js';
import { debounce } from './utils.js';

disableForm();

const RERENDER_DELAY = 500;
const DEFAULT_COUNT_OF_MARKER = 10;
const filterForm = document.querySelector('.map__filters');

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

const setCoordsOnInput = () => {
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
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: markerIcon,
        riseOnHover: true,
      },
    );
    marker.addTo(markerGroup)
      .bindPopup(
        createCard(author, offer),
        {
          keepInView: true,
        },
      );

  });
};

export const renderCards = (offerData) => {
  const cardData = mixedArray(offerData)
    .slice()
    .slice(0, DEFAULT_COUNT_OF_MARKER);
  createMarker(cardData);

  const onFilterChange = () => {
    const offerFilter = getFilterData(cardData);

    createMarker(offerFilter);
  };

  filterForm.addEventListener('change', debounce(onFilterChange, RERENDER_DELAY));
};

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


