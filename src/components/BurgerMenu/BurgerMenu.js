import React from "react";
import { NavLink } from "react-router-dom";
import './BurgerMenu.css';

function BurgerMenu({ menuOpen, closePopups }) {
  const navLinkClass = ({ isActive }) =>
    `menu__link ${isActive ? "menu__link_active" : ""}`;

  return (
    <div class={`menu ${menuOpen ? "menu_opened" : ""}`}>
      <div class="menu__container">
        <button class="menu__close-icon" type="button" aria-label="закрыть" onClick={closePopups}></button>
        <ul class="menu__list">
          <li class="menu__item">
            <NavLink to="/" class='menu__link'>
              Главная
            </NavLink>
          </li>
          <li class="menu__item">
            <NavLink to="/movies" class={navLinkClass}>
              Фильмы
            </NavLink>
          </li>
          <li class="menu__item">
            <NavLink to="/saved-movies" class={navLinkClass}>
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BurgerMenu;