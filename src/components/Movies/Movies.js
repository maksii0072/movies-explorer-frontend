import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useWindowSize from '../../utils/ScreenSizeWidth';
import { NOTFOUND_ERROR, DESKTOP_WIDTH, TABLET_WIDTH, MIDDLE_WIDTH, MOBILE_WIDTH, DESKTOP_AMOUNT, TABLET_AMOUNT, MIDDLE_AMOUNT, INBETWEEN_AMOUNT, MOBILE_AMOUNT, SHORTS_DURATION } from '../../utils/Constants/constants';

function Movies({ savedMovies, onSaveMovie, onDeleteMovie, setPreloaderPopupOpen }) {
  const [notFoundMessage, setNotFoundMessage] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isFilter, setFilter] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);
  const [initialRenderMovies, setInitialRenderMovies] = useState({amountToShow: 0, amountToAdd: 0});
  const { width } = useWindowSize();

  useEffect(() => {
    setFilteredMovies(handleFilter(searchResults));
  }, [searchResults]);

  useEffect(() => {
    handleSearchMovies();
  }, [searchKeyword, isFilter]);

  useEffect(() => {
    if( width >= DESKTOP_WIDTH) {
      setInitialRenderMovies(DESKTOP_AMOUNT);
    } else if(width >= TABLET_WIDTH) {
      setInitialRenderMovies(TABLET_AMOUNT);
    } else if(width >= MIDDLE_WIDTH) {
      setInitialRenderMovies(MIDDLE_AMOUNT);
    } else if(width >= MOBILE_WIDTH) {
      setInitialRenderMovies(INBETWEEN_AMOUNT);
    } else {
      setInitialRenderMovies(MOBILE_AMOUNT);
    }
  }, [width]);

  useEffect(() => {
    if (localStorage.getItem('previousRequest')) {
      setSearchKeyword(JSON.parse(localStorage.getItem('previousRequest')));
    }
    if (localStorage.getItem('previouslyRequestedMovies')) {
      setSearchResults(JSON.parse(localStorage.getItem('previouslyRequestedMovies')));
    }
    if (localStorage.getItem('selectedCheckboxState')) {
      setFilter(JSON.parse(localStorage.getItem('selectedCheckboxState')));
    }
  }, []);

  function handleSearchMovies() { // Ищет фильмы
    setSearchResults([]);
    try {
      if (searchKeyword.length > 0) {
        const searchResults = handleSearch(movies, searchKeyword);
        if (searchResults.length === 0) {
          console.log(NOTFOUND_ERROR);
          setNotFoundMessage(true);
        } else {
          setSearchResults(searchResults);
          setNotFoundMessage(false);
          localStorage.setItem('previousRequest', JSON.stringify(searchKeyword));
          localStorage.setItem('previouslyRequestedMovies', JSON.stringify(searchResults));
          localStorage.setItem('selectedCheckboxState', JSON.stringify(isFilter));
        }
      }
    } catch(err) {
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

  function handleMoreClick() {
    setInitialRenderMovies({amountToShow: initialRenderMovies.amountToShow + initialRenderMovies.amountToAdd, amountToAdd: initialRenderMovies.amountToAdd});
  }

  return (
    <main className='movies'>
      <SearchForm
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        isFilter={isFilter}
        setFilter={setFilter}
        movies={movies}
        setMovies={setMovies}
        setPreloaderPopupOpen={setPreloaderPopupOpen}
      />
      <MoviesCardList
        notFoundMessage={notFoundMessage}
        moviesData={isFilter ? filteredMovies : searchResults}
        savedMovies={savedMovies}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        amountToShow={initialRenderMovies.amountToShow}
        onClick={handleMoreClick}
      />
    </main>
  );
}

export default Movies;