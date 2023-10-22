import './Header.css';
import {NavLink, Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import {useState} from 'react';

function Header(props) {
  const {isLoggedIn} = props;

  const [showMenu, setIsShowMenu] = useState(false);

  function openMenu() {
    setIsShowMenu(true)
  };

  function closeMenu() {
    setIsShowMenu(false);
  }

  let headerTheme = isLoggedIn ? "header_theme_dark" : "header_theme_blue";

  return (
    <header className={`header ${headerTheme}`}>
      <nav className="header__nav">
        {isLoggedIn ?
        <>
        <ul className="header__links header__links_left">
          <li className="header__links-item header__links-item_logo">
          <Logo/>
          </li>
          <li className="header__links-item header__links-item_left">
          <NavLink className="header__link header__link_type_films" activeClassName="header__link_active" to="/movies">Фильмы</NavLink>
          </li>
          <li className="header__links-item header__links-item_left">
          <NavLink className="header__link header__link_type_savedfilms" activeClassName="header__link_active" to="/saved-movies">Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <NavLink className="header__link header__link_type_account" activeClassName="header__link_active" to="/profile">Аккаунт</NavLink>
        <button className="header__menu-button" onClick={openMenu}></button>
        <div className={!showMenu ? "header__menu-wrapper" : "header__menu-wrapper header__menu-wrapper_visible"}>
          <div className={!showMenu ? "header__menu-links-wrapper" : "header__menu-links-wrapper visible-animation"}>
            <button className="header__menu-button-close" onClick={closeMenu}></button>
            <ul className="header__menu-links">
              <li className="header__menu-links-item">
                <NavLink className="header__menu-link" to="/">Главная</NavLink>
              </li>
              <li className="header__menu-links-item">
                <NavLink className="header__menu-link" activeClassName="header__menu-link_active" onClick={closeMenu} to="/movies">Фильмы</NavLink>
              </li>
              <li className="header__menu-links-item">
                <NavLink className="header__menu-link" activeClassName="header__menu-link_active" onClick={closeMenu} to="/saved-movies">Сохранённые фильмы</NavLink>
              </li>
              <li className="header__menu-links-item">
                <NavLink className="header__menu-link header__menu-link_type_account" onClick={closeMenu} to="/profile">Аккаунт</NavLink>
              </li>
            </ul>
          </div>
        </div>
        </>
        :
        <>
        <Logo/>
        <ul className="header__links header__links_right">
          <li className="header__links-item header__links-item_right">
          <NavLink className="header__link header__link_type_signup" activeClassName="header__link_active" to='/signup'>Регистрация</NavLink>
          </li>
          <li className="header__links-item header__links-item_left">
            <NavLink className="header__link header__link_type_signin" activeClassName="header__link_active" to="/signin">Войти</NavLink>
          </li>
        </ul>
        </>
        }
      </nav>
    </header>
  )
}

export default Header;
