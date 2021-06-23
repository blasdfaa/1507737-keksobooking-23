import { renderCard } from './offer-card.js';
import { createOffersArray } from './mock-data.js';
import { disableForm, activateForm, сompleteAddressInput } from './form.js';

const offersArray = createOffersArray();
const defaultCoords = {
  LAT: 35.65160,
  LNG: 139.74908,
};

disableForm();

export const map = L.map('map-canvas')
  .on('load', () => activateForm())
  .setView({
    lat: defaultCoords.LAT,
    lng: defaultCoords.LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

const defaultMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
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

defaultMarker.addTo(map);


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

const getMarkerCoords = () => {
  сompleteAddressInput(`${defaultCoords.LAT}, ${defaultCoords.LNG}`);

  defaultMarker.on('drag', (event) => {
    const coords = event.target.getLatLng();
    const lat = coords.lat.toFixed(5);
    const lng = coords.lng.toFixed(5);

    сompleteAddressInput(`${lat}, ${lng}`);
  });
};

getMarkerCoords();

const createMarkerGroup = L.layerGroup().addTo(map);
const createMarker = (offerData) => {
  const { location } = offerData;

  const markerIcon = L.icon({
    iconUrl: '../img/pin.svg',
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
    .addTo(createMarkerGroup)
    .bindPopup(
      renderCard(offerData),
      {
        keepInView: true,
      },
    );
};

offersArray.forEach((offer) => {
  createMarker(offer);
});

