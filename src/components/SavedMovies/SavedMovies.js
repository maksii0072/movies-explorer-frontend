import React, { useEffect, useState} from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { filterMovies, durationFilter } from '../../utils/utils';

function SavedMovies({ menuOpen, closePopups, loggedIn, handleMenuClick, handleCardDelete, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchMovies(query) {
    setSearchQuery(query);
    const moviesList = filterMovies(savedMovies, query);
    setFilteredMovies(isShortMovies ? durationFilter(moviesList) : moviesList);
  }


  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(!isShortMovies ? durationFilter(moviesList) : moviesList);
  }



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
        handleSearchMovies={handleSearchMovies} />
        <MoviesCardList
        isNotFound={isNotFound}
        isSavedFilms={true}
        cards={filteredMovies}
        savedMovies={savedMovies}
        handleCardDelete={handleCardDelete} />
      </main>
      <Footer />
    </section>
  );
}

export default SavedMovies;