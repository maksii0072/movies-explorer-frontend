import "./MoviesCard.css";
import image from '../../images/notFoundImage.jpg';
import {useState, useEffect} from 'react';

function MoviesCard(props) {

  const [isSaved, setIsSaved] = useState(false);

  const film = {
    country : props.movie.country || 'Страна',
    director: props.movie.director || 'Режиссер',
    duration: props.movie.duration || 0,
    year: props.movie.year || 'Не указано',
    description: props.movie.description || 'Описание',
    image: `${props.movie.image === null ? `${image}` : `https://api.nomoreparties.co${props.movie.image?.url}`}`,
    trailer: props.movie?.trailerLink,
    nameRU: props.movie.nameRU || 'Название',
    nameEN: props.movie.nameEN || 'Англ название',
    thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
    movieId: props.movie.id,
}

  const formattedTime = `${Math.trunc(film.duration/60)}ч ${film.duration % 60}м`;

  function isLikedMovie() {
    if (localStorage.getItem('savedMovies')) {
      let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      if (savedMovies.some(movie => movie.nameRU === props.movie.nameRU)) {
        setIsSaved(true);
      }
    }
  }

  function handleSaveMovie() {
    props.handleSaveMovie(film);
    console.log(film);
    setIsSaved(true);
  }

  function handleDeleteMovie() {
    setIsSaved(false);
    props.handleDeleteMovie(props.movie._id);
  }

  function handleDislikeMovie() {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const card = savedMovies.find(movie => movie.nameRU === props.movie.nameRU);
    props.handleDeleteMovie(card._id);
    setIsSaved(false);
  }

  useEffect(() => {
    isLikedMovie();
  }, []);

  return (
    <div className="card">
      <div className="card__wrapper">
      <h2 className="card__title">{props.movie.nameRU}</h2>
      <p className="card__time">{`${formattedTime}`}</p>
      </div>
      <a className="card__image-link" href={props.isSavedMovies ? props.movie.trailer : props.movie.trailerLink}>
      <img className="card__image" src={props.isSavedMovies ? props.movie.image : film.image} alt="Картинка фильма" />
      </a>
      {props.isSavedMovies ?
       <button className="card__delete-button" type="button" onClick={handleDeleteMovie}></button>
      :
      <button className={isSaved ? 'active-btn' : 'card__save-button'} onClick={!isSaved ? handleSaveMovie : handleDislikeMovie } type="button">{isSaved? '' : 'Сохранить'}</button>}

    </div>
  )
}

export default MoviesCard;