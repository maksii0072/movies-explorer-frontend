import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ notFoundMessage, moviesData, savedMovies, onSaveMovie, onDeleteMovie, amountToShow, onClick }) {

  const { pathname } = useLocation();

  return (
    <section className={`moviesCardList ${pathname === '/saved-movies' ? 'moviesCardList-saved' : ''}`}>
      {
        <ul className='moviesCardList__ul'>
          {
            moviesData?.slice(0, amountToShow).map((movieData) => (
              <MoviesCard
                key={movieData._id || movieData.id}
                id={movieData._id || movieData.id}
                movieData={movieData}
                savedMovies={savedMovies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
              />
            ))
          }
        </ul>
      }
      {
        notFoundMessage ? <p className='moviesCardList__notfound'>Ничего не найдено</p> : <></>
      }
      {
        moviesData.length > amountToShow && (
          <button className={`moviesCardList__button ${pathname === '/saved-movies' ? 'moviesCardList__button-saved' : ''}`} type='button' onClick={onClick}>Ещё</button>
        )
      }
    </section>
  );
}

export default MoviesCardList;