import './Profile.css';
import { NavLink } from "react-router-dom";

import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Profile(props) {
  const { handleMenuClick, menuOpen, closePopups } = props;
  return (
    <>
    <section className="profile">
      <BurgerMenu
        menuOpen={menuOpen}
        closePopups={closePopups} />
      <Header loggedIn={true} handleMenuClick={handleMenuClick} />
      <main className='profile__container'>
        <h1 className="profile__title">Привет, Максим!</h1>
        <form id="form" className="profile__form" >
          <div className='profile__row'>
            <label className="profile__field">
              Имя
            </label>
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              defaultValue='Максим'
              placeholder="Укажите ваш имя"
              required
            />
            <span className="profile__input-error"></span>
          </div>
          <div className="profile__border"></div>
          <div className='profile__row'>
            <label className="profile__field">
              E-mail
            </label>
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              defaultValue='test@yandex.ru'
              placeholder="Укажите ваш email"
              required
            />
            <span className="profile__input-error"></span>
          </div>
          <button
            type="submit"
            className="profile__button-save profile__button"
          >
            Редактировать
          </button>
          {/* <button type="button" className="profile__button-logout profile__button  ">
            Выйти из аккаунта
          </button> */}
         <NavLink className="profile__button-logout profile__button " to="/">Выйти из аккаунта</NavLink>
        </form>

        </main>
    </section>
    </>
  );
}

export default Profile;