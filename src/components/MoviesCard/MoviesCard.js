import { useLocation } from 'react-router-dom';
import { EXTERNAL_URL } from '../../utils/Constants/constants';
import "./MoviesCard.css";
import duration from '../../utils/utils';

function MoviesCard({ id, movieData, savedMovies, onSaveMovie, onDeleteMovie }) {

  const { pathname } = useLocation();
  const isMoviePage = pathname === '/movies';
  const isFilmSaved = savedMovies.some(savedMovie => savedMovie.nameEN === movieData.nameEN);

  if (isMoviePage && isFilmSaved) {
    const savedFilm = savedMovies.find(savedMovie => savedMovie.nameEN === movieData.nameEN);
    id = savedFilm._id
  }

  function handleSaveMovie() {
    onSaveMovie(movieData);
  }

  function handleDeleteMovie() {
    onDeleteMovie(id);
  }

  return (
    <li className='moviesCard'>
      <a className='moviesCard__trailerLink' href={movieData.trailerLink} target='_blank' rel='noreferrer'>
        <img className='moviesCard__preview' src={ pathname === '/movies' ? `${EXTERNAL_URL}${movieData.image.url}` : movieData.image} alt={`${movieData.nameRU}`} />
      </a>
      <div className="moviesCard__text">
        <h2 className="moviesCard__title">{movieData.nameRU}</h2>
        {
          isMoviePage ? (
            <button
              className={`moviesCard__heart-button ${isFilmSaved ? 'moviesCard__heart-button-red' : ''} `}
              type="button"
              onClick={isFilmSaved ? handleDeleteMovie : handleSaveMovie}
            />
          ) : (
            <button
              className={`moviesCard__heart-button moviesCard__heart-button-saved`}
              type="button"
              onClick={handleDeleteMovie}
            />
          )
        }
      </div>
      <p className='moviesCard__duration'>{duration(movieData.duration)}</p>
    </li >
  );
}

export default MoviesCard;