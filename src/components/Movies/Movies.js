import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Movies(props) {
  const { menuOpen, closePopups, isLiked, handleLikeClick, handleMenuClick } = props;
  return (
    <section className="movies">
      <BurgerMenu
        menuOpen={menuOpen}
        closePopups={closePopups} />
      <Header
        loggedIn={true}
        handleMenuClick={handleMenuClick} />
      <main >
        <SearchForm />
        <MoviesCardList
          isLiked={isLiked}
          handleLikeClick={handleLikeClick} />
      </main>
      <Footer />
    </section>
  );
}

export default Movies;
