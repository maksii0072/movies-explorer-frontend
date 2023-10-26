import { EXTERNAL_URL } from './Constants/constants';

class MoviesApi {
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

    getAllMovies() { // Возвращает все фильмы
        return this._request(`${this._url}`, {
            headers: this._headers
        });
    }
}

const moviesApi = new MoviesApi({
    url: `${EXTERNAL_URL}/beatfilm-movies`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default moviesApi;