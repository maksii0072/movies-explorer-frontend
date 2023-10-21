import React, { useEffect, useState } from "react";
import './MoviesCard.css';
import { durationConverter } from "../../utils/utils";

function MoviesCard({ card, isSavedFilms, handleLikeClick, handleCardDelete, savedMovies }) {
  const defaultSaved = savedMovies.some((m) => m.movieId === card.id);
  const [saved, setSaved] = useState(defaultSaved);

  useEffect(() => {
    const localStorageKey = `movie-${card.id}`;
    const localStorageValue = localStorage.getItem(localStorageKey);

    if (localStorageValue === "true") {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [card]);

  function onCardClick() {
    if (saved) {
      handleCardDelete(card, () => {
        setSaved(false);
        const localStorageKey = `movie-${card.id}`;
        localStorage.setItem(localStorageKey, "false");
      });
    } else {
      handleLikeClick(card, saved, () => {
        setSaved(true);
        const localStorageKey = `movie-${card.id}`;
        localStorage.setItem(localStorageKey, "true");
      });
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
            className={`${saved ? 'card__like-button card__like-button_active' : 'card__like-button'}`}
            onClick={onCardClick} >
          </button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
