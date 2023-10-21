import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { filterMovies, durationFilter } from '../../utils/utils';

function SavedMovies({ menuOpen, closePopups, loggedIn, handleMenuClick, handleCardDelete, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchMovies(query) {
    setSearchQuery(query);
    localStorage.setItem('savedMoviesSearchQuery', query); 
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    localStorage.setItem('savedMoviesIsShortMovies', isShortMovies);
  }

  useEffect(() => {
    const savedMoviesSearchQuery = localStorage.getItem('savedMoviesSearchQuery');
    const savedMoviesIsShortMovies = localStorage.getItem('savedMoviesIsShortMovies') === 'true';

    setSearchQuery(savedMoviesSearchQuery || '');
    setIsShortMovies(savedMoviesIsShortMovies);

    const moviesList = filterMovies(savedMovies, savedMoviesSearchQuery);
    setFilteredMovies(savedMoviesIsShortMovies ? durationFilter(moviesList) : moviesList);
  }, [savedMovies]);

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
          onFilter={handleShortMovies}
          handleSearchMovies={handleSearchMovies}
        />
        <MoviesCardList
          isNotFound={isNotFound}
          isSavedFilms={true}
          cards={filteredMovies}
          savedMovies={savedMovies}
          handleCardDelete={handleCardDelete}
        />
      </main>
      <Footer />
    </section>
  );
}

export default SavedMovies;
