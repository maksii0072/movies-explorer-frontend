import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moviesApi from '../../utils/MoviesApi';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ searchKeyword, setSearchKeyword, isFilter, setFilter, movies, setMovies, setPreloaderPopupOpen }) {
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isWarningVisible, setWarningVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    setWarningVisible(false);
    setIsValid(false);
    setSearchQuery(evt.target.value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (pathname === '/movies'){
      if (!movies.length) {
        setPreloaderPopupOpen(true);
        await moviesApi
          .getAllMovies()
          .then((allMovies) => {
            localStorage.setItem('movies', JSON.stringify(allMovies));
            setMovies(allMovies);
          })
          .catch(console.error)
          .finally(() => setPreloaderPopupOpen(false));
      }
    }

    if (searchQuery.trim() === '') {
      setWarningVisible(true);
      setIsValid(true);
      return;
    }

    setSearchKeyword(searchQuery);
  }

  useEffect(() => {setSearchQuery(searchKeyword)}, [searchKeyword]);

  return (
<section className='searchForm'>
<form className='searchForm__form' onSubmit={handleSubmit} noValidate>
        <input
            className='searchForm__input'
            type='text'
            name='movietitle'
            placeholder='Фильм'
            value={searchQuery}
            minLength='1'
            required
            onChange={handleChange}
          >
        </input>
        <button className={`searchForm__button ${isValid ? 'searchForm__button_disable' : ''}`} type='submit' disabled={isValid}>Найти</button>
      </form>
      <FilterCheckbox isFilter={isFilter} setFilter={setFilter} />

      <span className='searchForm__error'>{isWarningVisible && 'Нужно ввести ключевое слово'}</span>
    </section>
  );
}

export default SearchForm;