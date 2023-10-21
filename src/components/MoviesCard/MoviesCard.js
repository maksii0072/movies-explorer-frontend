import React, { useEffect, useState } from "react";
import './MoviesCard.css';
import { durationConverter } from "../../utils/utils";

function MoviesCard({ card, isSavedFilms, handleLikeClick, handleCardDelete, savedMovies }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {

    if (localStorage.getItem('savedMovies')) {
      let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      if (savedMovies.some(movie => movie.movieId === card.id)) {
        setSaved(true);
      }
    }
  }, [card]);

  function onCardClick() {
    if (saved) {
      handleCardDelete(card, setSaved);
    } else {
      handleLikeClick(card, saved, setSaved);


      let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
      savedMovies.push(card);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }
  }

  function onDelete() {
    handleCardDelete(card);
  }

  return (
    <li className="card">
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="card__image"
          alt={card.nameRU}
          src={isSavedFilms ? card.image : `https://api.nomoreparties.co/${card.image.url}`}
        />
      </a>
      <div className="card__container">
        <figcaption className="card__info-container">
          <h2 className="card__text">{card.nameRU}</h2>
          <p className="card__time">{durationConverter(card.duration)}</p>
        </figcaption>
        {isSavedFilms ? (
          <button
            type="button"
            className="card__delete-button"
            onClick={onDelete}>
          </button>
        ) : (
          <button
            type="button"
            className={`card__like-button ${saved ? 'card__like-button_active' : ''}`}
            onClick={onCardClick} >
          </button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
