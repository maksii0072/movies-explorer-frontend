import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, onMenuPopup }) {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname === '/' ? '' : 'header_main'}`}>
      <Link className='header__link-logo' to='/' />
      {
        loggedIn ? (
          <Navigation onMenuPopup={onMenuPopup} />
        ) : (
          <nav className='header__infoblock'>
            <Link className='header__signup' to='/signup'>Регистрация</Link>
            <Link className='header__signin' to='/signin'>Войти</Link>
          </nav>
          
        )
      }
    </header>
  );
}

export default Header;