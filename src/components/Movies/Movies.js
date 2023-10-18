import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import * as movies from '../../utils/MoviesApi';
import { filterMovies, durationFilter } from '../../utils/utils';

function Movies({
  menuOpen,
  closePopups,
  handleMenuClick,
  handleLikeClick,
  loggedIn,
  handleCardDelete,
  savedMovies
}) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReqError, setIsReqError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  // Функция для обработки нажатия на кнопку "Лайк"
  function handleLike(movie) {
    const updatedMovies = initialMovies.map((m) => {
      if (m.id === movie.id) {
        return {
          ...m,
          isLiked: !m.isLiked, // Инвертируем состояние лайка
        };
      }
      return m;
    });
    setInitialMovies(updatedMovies);
    // Сохраняем обновленное состояние в локальном хранилище
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
  }

  // Функция для загрузки данных о фильмах
  function loadMoviesFromApi() {
    setIsLoading(true);
    movies
      .getCards()
      .then((cardsData) => {
        handleFilterMovies(cardsData, localStorage.getItem('movieSearch'), isShortMovies);
        setIsReqError(false);
      })
      .catch((err) => {
        setIsReqError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }

    if (localStorage.getItem('movies')) {
      const moviesData = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(moviesData);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(durationFilter(moviesData));
      } else {
        setFilteredMovies(moviesData);
      }
    } else {
      loadMoviesFromApi();
    }
  }, []);

  // Обработка изменений в фильтрации
  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <section className="movies">
      <BurgerMenu menuOpen={menuOpen} closePopups={closePopups} />
      <Header loggedIn={loggedIn} handleMenuClick={handleMenuClick} />
      <main>
        <SearchForm
          handleSearchMovies={handleSearchMovies}
          onFilter={handleShortMovies}
          isShortMovies={isShortMovies}
        />
        <MoviesCardList
          handleLikeClick={handleLikeClick}
          handleCardDelete={handleCardDelete}
          savedMovies={savedMovies}
          cards={filteredMovies}
          isSavedFilms={false}
          isLoading={isLoading}
          isReqError={isReqError}
          isNotFound={isNotFound}
        />
      </main>
      <Footer />
    </section>
  );
}

export default Movies;
