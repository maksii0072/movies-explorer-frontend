import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { NOTFOUND_ERROR, SHORTS_DURATION } from '../../utils/Constants/constants';

function SavedMovies({ savedMovies, onDeleteMovie }) {
  const [notFoundMessage, setNotFoundMessage] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isFilter, setFilter] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setFilteredMovies(handleFilter(searchResults));
  }, [searchResults]);

  useEffect(() => {
    handleSearchMovies();
  }, [searchKeyword, isFilter, savedMovies]);

  function handleSearchMovies() { // Ищет фильмы
    setSearchResults([]);
    try {
      if (searchKeyword.length > 0) {
        const searchResults = handleSearch(savedMovies, searchKeyword);
        if (searchResults.length === 0) {
          console.log(NOTFOUND_ERROR);
          setNotFoundMessage(true);
        } else {
          setSearchResults(searchResults);
          setNotFoundMessage(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleSearch(array, keyword) { // Осуществляет поиск в массиве фильмов (array) по заданному ключевому слову
    return array.filter((movie) => { // Проверяет каждый фильм в исходном массиве на наличие ключевого слова и возврата его
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase().trim()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase().trim());
    });
  }

  function handleFilter(array) { // Осуществляет поиск в массиве фильмов (array) по короткометражкам
    return array.filter((movie) => {
      return movie.duration <= SHORTS_DURATION;
    });
  }

  return (
    <main className='savedMovies'>
      <SearchForm
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        isFilter={isFilter}
        setFilter={setFilter}
      />
      <MoviesCardList
        notFoundMessage={notFoundMessage}
        moviesData={!searchKeyword ? isFilter ? filteredMovies : savedMovies : isFilter ? filteredMovies : searchResults}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  );
}

export default SavedMovies;