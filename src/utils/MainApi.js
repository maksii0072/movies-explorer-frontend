import { EXTERNAL_URL, OUR_URL } from './Constants/constants';

class MainApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    _getUserInfo() { // Возвращает информацию о пользователе
        return this._request(`${this._url}/users/me`, {
            headers: this._headers
        });
    }

    _getSavedMovies() { // Возвращает все сохраненные фильмы
        return this._request(`${this._url}/movies`, {
            headers: this._headers
        });
    }

    getAllNeededData() {
        return Promise.all([this._getUserInfo(), this._getSavedMovies()]);
    }

    patchUserInfo(data) { // Обновляет информацию о пользователе
        return this._request(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        });
    }

    postNewMovie(data) { // Публикует новый фильм
        return this._request(`${this._url}/movies`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: `${EXTERNAL_URL}${data.image.url}`,
                trailerLink: data.trailerLink,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
                thumbnail: `${EXTERNAL_URL}${data.image.formats.thumbnail.url}`,
                movieId: data.id
            })
        });
    }

    deleteMovie(movieId) { // Удаляет фильм по id
        return this._request(`${this._url}/movies/${movieId}`, {
            headers: this._headers,
            method: 'DELETE'
        });
    }

    getJwt() {
        return this._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    }
}

const mainApi = new MainApi({
    url: OUR_URL,
    headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
    }
});

export default mainApi;