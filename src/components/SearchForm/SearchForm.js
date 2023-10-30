import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ handleSearchMovies, onFilter, isShortMovies }) {
  const [queryError, setQueryError] = useState(false);
  const [movieQuery, setMovieQuery] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const localQuery = localStorage.getItem('movieSearch');
      setMovieQuery(localQuery);
    }
  }, [pathname]);

  function handleChangeQuery(e) {
    setMovieQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (movieQuery.length === 0) {
      setQueryError(true);
    } else {
      setQueryError(false);
      handleSearchMovies(movieQuery);
    }
  }

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={handleSubmit}>
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          onChange={handleChangeQuery}
          value={movieQuery || ''}
          >
        </input>
        <button className="search__button" type="submit">Найти</button>
      </form>
      <FilterCheckbox onFilter={() => onFilter(movieQuery)} isShortMovies={isShortMovies} />
      {queryError && <span className="search__form-error">Нужно ввести ключевое слово</span>}
      <span className="search__form-border"></span>
    </section>
  );
}

export default SearchForm;
