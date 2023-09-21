import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import account from '../../images/icon_account.svg';
import burger from '../../images/icon_burger.svg';

function Header(props) {
  const { handleMenuClick, loggedIn } = props;
  return (
    <header>
      <nav>
        {!loggedIn ? (
          <section className="header" id="header">
            <Link to="/" className="logo">
              <img src={logo} alt="логотип" />
            </Link>
            <nav className="header__button-container">
              <Link to="/signup" className="header__button">
                Регистрация
              </Link>
              <Link to="/signin" className="header__button header__button-green">
                Войти
              </Link>
            </nav>
          </section>
        ) : (
          <section className="header" id="header">
            <Link to="/" className="logo">
              <img src={logo} alt="логотип" />
            </Link>
            <nav>
              <ul className="header__button-container-films">
                <li>
                  <NavLink to="/movies" className="header__button">
                    Фильмы
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/saved-movies" className="header__button">
                    Сохранённые фильмы
                  </NavLink>
                </li>
              </ul>
            </nav>
            <nav>
              <ul className="header__button-container">
                <li>
                  <Link to="/profile" className="header__account-button">
                    Аккаунт
                    <img src={account} alt="аккаунт" className='header__account-image' />
                  </Link>
                  <button type='button' className="header__burger-button" onClick={handleMenuClick}>
                    <img src={burger} alt="бургер-меню" />
                  </button>
                </li>
              </ul>
            </nav>
          </section>
        )}
      </nav>
    </header>
  );
}

export default Header;