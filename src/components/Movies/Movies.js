
import React, { useEffect, useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');

  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMovies(movies, query, short);
    setInitialMovies(moviesList);
    setFilteredMovies(short ? durationFilter(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
    localStorage.setItem('allMovies', JSON.stringify(movies));
    localStorage.setItem('isShortMovies', short);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (durationFilter(initialMovies).length === 0) {
        setFilteredMovies(durationFilter(initialMovies));
      } else {
        setFilteredMovies(durationFilter(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('isShortMovies', !isShortMovies);
  }

  function handleSearchMovies(query) {
    setSearchQuery(query);
    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      handleFilterMovies(movies, query, isShortMovies);
    } else {
      setIsLoading(true);
      movies.getCards()
        .then((cardsData) => {
          handleFilterMovies(cardsData, query, isShortMovies);
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

    localStorage.setItem('movieSearch', query);
  }

  useEffect(() => {

    const isShortMovies = localStorage.getItem('isShortMovies') === 'true';
    setIsShortMovies(isShortMovies);
  }, []);

  useEffect(() => {

    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (localStorage.getItem('isShortMovies') === 'true') {
        setFilteredMovies(durationFilter(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  useEffect(() => {

    if (localStorage.getItem('movieSearch')) {
      const query = localStorage.getItem('movieSearch');
      setSearchQuery(query);
    }
  }, []);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
<section className="movies">
      <BurgerMenu
        menuOpen={menuOpen}
        closePopups={closePopups} />
      <Header
        loggedIn={loggedIn}
        handleMenuClick={handleMenuClick} />
      <main>
        <SearchForm
          handleSearchMovies={handleSearchMovies}
          onFilter={handleShortMovies}
          isShortMovies={isShortMovies} />
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
  )
}

export default Movies;
