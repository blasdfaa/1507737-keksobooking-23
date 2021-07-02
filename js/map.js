import { renderCard } from './offer-card.js';
import { disableForm, activateForm, сompleteAddressInput } from './form.js';
import { sortOffers } from './map-filter.js';

const defaultCoords = {
  LAT: 35.65160,
  LNG: 139.74908,
};
const MARKER_MAX_COUNTS = 10;

disableForm();

const defaultMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const defaultMarker = L.marker(
  {
    lat: defaultCoords.LAT,
    lng: defaultCoords.LNG,
  },
  {
    draggable: true,
    icon: defaultMarkerIcon,
  },
);

// const returnMarkerOnDefault = () => {
//   defaultMarker.setLatLng({
//     lat: defalutCoords.LAT,
//     lng: defalutCoords.LNG,
//   });

//   map.setView({
//     lat: defalutCoords.LAT,
//     lng: defalutCoords.LNG,
//   }, 10);
// };

const setCoordsOnInput = () => {
  сompleteAddressInput(`${defaultCoords.LAT}, ${defaultCoords.LNG}`);

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
    lat: defaultCoords.LAT,
    lng: defaultCoords.LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

defaultMarker.addTo(map);

export const markerGroup = L.layerGroup().addTo(map);

export const createMarker = (offerData) => {
  offerData
    .slice()
    .filter(sortOffers)
    .slice(0, MARKER_MAX_COUNTS)
    .forEach(({ author, offer, location }) => {
      const markerIcon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker(
        {
          lat: location.lat,
          lng: location.lng,
        },
        {
          icon: markerIcon,
          riseOnHover: true,
        },
      );

      marker
        .addTo(markerGroup)
        .bindPopup(
          renderCard(author, offer),
          {
            keepInView: true,
          },
        );
    });
};
