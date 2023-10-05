    class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getInitialCards() {
        return fetch(this._baseUrl, {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(this._checkResponse)
    }
    }



    export const api = new Api({
    baseUrl: 'https://api.movies-choice.nomoreparties.co',
    });