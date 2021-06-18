const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const adFormElements = Array.from(adForm.children);
const filterFormElements = Array.from(filterForm.children);

const disableForm = () => {
  adForm.classList.add('ad-form--disable');
  adFormElements.forEach((element) => element.disabled = true);

  filterForm.classList.add('map__filters--disable');
  filterFormElements.forEach((element) => element.disabled = true);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disable');
  adFormElements.forEach((element) => element.disabled = false);

  filterForm.classList.remove('ad-form--disable');
  filterFormElements.forEach((element) => element.disabled = false);
};

export { disableForm, activateForm };
