import './SideBar.css';
import { Link } from 'react-router-dom';
import loggedIn from '../../images/loggedIn.svg'

function SideBar({ isOpen, onClose, onOverlayClick }) {
    return (
        <nav className={`sideBar ${isOpen ? 'sideBar_is-opened' : ''}`} onClick={onOverlayClick}>
            <div className='sideBar__container'>
                <Link className='sideBar__movies' to='/' onClick={onClose}>Главная</Link>
                <Link className='sideBar__movies' to='/movies' onClick={onClose}>Фильмы</Link>
                <Link className='sideBar__movies' to='/saved-movies' onClick={onClose}>Сохранённые фильмы</Link>
                <Link className='sideBar__account' to='/profile' onClick={onClose}>
                    Аккаунт
                    <img src={loggedIn} alt='Аккаунт' className='sideBar__img' />
                </Link>
                <button className='sideBar__button' type='button' onClick={onClose} />
            </div>
        </nav>
    );
  }

  export default SideBar;