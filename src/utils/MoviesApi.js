import { checkResponse } from './MainApi';

const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export function getCards() {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(checkResponse);
}
