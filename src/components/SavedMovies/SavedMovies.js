import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function SavedMovies(props) {
  const { menuOpen, closePopups, isLiked, handleMenuClick, handleLikeClick } = props;
  return (
    <main >
    <section className="movies">
      <BurgerMenu
        menuOpen={menuOpen}
        closePopups={closePopups} />
      <Header
        loggedIn={true}
        handleMenuClick={handleMenuClick} />
      <main>
        <SearchForm />
        <MoviesCardList
          isLiked={isLiked}
          handleLikeClick={handleLikeClick} />
      </main>
      <Footer />
    </section>
    </main>
  );
}

export default SavedMovies;
