import { setFilePreview } from './utils.js';

const AVATAR_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PHOTO_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_PREVIEW_IMAGE = 'img/muffin-grey.svg';

// Avatar

const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

setFilePreview(avatarInput, avatarPreview, AVATAR_FILE_TYPES);

// Photo

const housePhotoInput = document.querySelector('#images');
const housePhotoPreview = document.querySelector('.ad-form__photo img');

setFilePreview(housePhotoInput, housePhotoPreview, PHOTO_FILE_TYPES);

export const resetFileInputs = () => {
  avatarInput.value = '';
  housePhotoInput.value = '';

  avatarPreview.src = DEFAULT_PREVIEW_IMAGE;
  housePhotoPreview.src = DEFAULT_PREVIEW_IMAGE;
};
