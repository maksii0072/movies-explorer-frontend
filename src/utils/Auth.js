import { OUR_URL } from './Constants/constants';

class Auth {
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

    signup({name, email, password}) { // Регестрирует пользователя
        return this._request(`${this._url}/signup`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({name, email, password})
        });
    }

    signin({email, password}) { // Авторизовывает пользователя, проверяя учетные данные
        return this._request(`${this._url}/signin`, {
            headers: this._headers,
            method:'POST',
            body: JSON.stringify({email, password})
        });
    }

    getCurrentUser(jwt) { // Проверяет валидность токена
        return this._request(`${this._url}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
          },
          method: 'GET'
        });
    }
}

const auth = new Auth({
    url: OUR_URL,
    headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
    }
});

export default auth;