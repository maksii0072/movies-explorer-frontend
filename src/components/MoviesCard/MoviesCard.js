import './MoviesCard.css';
import image1 from '../../images/pic_1.jpg'
import image2 from '../../images/pic_2.jpg'
import image3 from '../../images/pic_3.jpg'

function MoviesCard(props) {
  const { trailerLink, handleLikeClick, isLiked } = props;
  return (
    <>
      <li className="card">
        <a href={trailerLink} target="_blank" rel="noreferrer">
          <img
            className="card__image"
            alt='постер к фильму 33 слова о дизайне'
            src={image1}
          />
        </a>
        <div className="card__container">
          <figcaption className="card__info-container">
            <h2 className="card__text">33 слова о дизайне</h2>
            <p className="card__time">1ч 47м</p>
          </figcaption>
          <div className="card__container-button">
          <button type="button" className="card__delete-button"></button>
          <button type="button" className={`card__like-button ${ isLiked ? "card__like-button_active" : ""}`} onClick={handleLikeClick}></button>
          </div>
        </div>
      </li>
      <li className="card">
        <a href={trailerLink} target="_blank" rel="noreferrer">
          <img
            className="card__image"
            alt='постер к фильму Киноальманах «100 лет дизайна'
            src={image2}
          />
        </a>
        <div className="card__container">
          <figcaption className="card__info-container">
            <h2 className="card__text">Киноальманах «100 лет дизайна»</h2>
            <p className="card__time">1ч 3м</p>
          </figcaption>
          <div className="card__container-button">
          <button type="button" className="card__delete-button"></button>
          <button type="button" className={`card__like-button ${ isLiked ? "card__like-button_active" : ""}`} onClick={handleLikeClick}></button>
          </div>
        </div>
      </li>
      <li className="card">
        <a href={trailerLink} target="_blank" rel="noreferrer">
          <img
            className="card__image"
            alt='постер к фильму В погоне за Бенкси'
            src={image3}
          />
        </a>
        <div className="card__container">
          <figcaption className="card__info-container">
            <h2 className="card__text">В погоне за Бенкси</h2>
            <p className="card__time">1ч 42м</p>
          </figcaption>
          <div className="card__container-button">
          <button type="button" className="card__delete-button"></button>
          <button type="button" className={`card__like-button ${ isLiked ? "card__like-button_active" : ""}`} onClick={handleLikeClick}></button>
          </div>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;