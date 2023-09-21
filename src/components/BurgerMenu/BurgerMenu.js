import { NavLink, Link } from "react-router-dom";
import './BurgerMenu.css';
import account from '../../images/icon_account.svg';

function BurgerMenu(props) {
  const { menuOpen, closePopups } = props;
  const menuClassName = `menuElement ${menuOpen ? "menu_opened" : ""}`;

  return (
    <div className={menuClassName}>
      <div className='menu'>
        <button className="menu__close-icon" type="button" aria-label="закрыть" onClick={closePopups}></button>
        <ul className="menu__list">
          <li className="menu__item">
            <NavLink to="/" className='menu__link'>
              Главная
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="/movies" className='menu__link menu__link_active'>
              Фильмы
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="/saved-movies" className='menu__link'>
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <div className="menu__footer-box">
          <Link className="menu__footer-box-account-button" to="/profile">Аккаунт</Link>
          <Link to="/profile">
            <img src={account} alt="Логотип аккаунта" className="menu__footer-box-account-image" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
