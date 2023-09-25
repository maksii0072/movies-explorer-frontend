const BASE_URL = "https://api.movies-choice.nomoreparties.co";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export function register(name, email, password) {
  return fetch(BASE_URL + '/signup', {
    method: 'POST',
    body: JSON.stringify(name, email, password),
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}

export function login(email, password) {
  return fetch(BASE_URL + '/signin', {
    method: 'POST',
    body: JSON.stringify(email, password),
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}

export function logout() {
  return fetch(BASE_URL + '/signout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
  })
    .then(checkResponse)
}

export function getUserInfo() {
  return fetch(BASE_URL + '/users/me', {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include"
  })
    .then(checkResponse)
}

// изменяем данные профиля
export const updateUserInfo = (data) => {
  return fetch(BASE_URL + '/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
    credentials: "include"
  })
    .then(checkResponse)
};

export const getSaveCards = () => {
  return fetch(BASE_URL + '/movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
  })
    .then(checkResponse)
};

// добавляем новую карточку
export const postSaveCard = (data) => {
  return fetch(BASE_URL + '/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: 'https://api.nomoreparties.co' + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  })
    .then(checkResponse)
};

// удаление карточки
export const deleteSaveCard = (cardId) => {
  return fetch(`${BASE_URL}/movies/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
  })
    .then(checkResponse)
};
