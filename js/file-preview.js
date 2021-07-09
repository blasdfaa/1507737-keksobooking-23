import { setFilePreview } from './utils.js';

// Avatar

const AVATAR_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarField = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

setFilePreview(avatarField, avatarPreview, AVATAR_FILE_TYPES);

// Photo

const PHOTO_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const photoField = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo img');

setFilePreview(photoField, photoPreview, PHOTO_FILE_TYPES);
