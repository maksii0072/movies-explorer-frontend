import './LoggedIn.css';

import { Link, NavLink, useLocation} from 'react-router-dom';
import loggedIn from '../../images/loggedIn.svg'

function LoggedIn({}) {

    const { pathname } = useLocation();

    return (
        <nav className='loggedIn'>
            <div className='loggedIn__movies'>
                <NavLink className='loggedIn__movie' to='/movies'>Фильмы</NavLink>
                <NavLink className='loggedIn__movie' to='/saved-movies'>Сохранённые фильмы</NavLink>
            </div>
            <Link className='loggedIn__account' to='/profile'>
                Аккаунт
                <img src={loggedIn} alt='Aккаунт' className={`loggedIn__img ${pathname === '/' ? '' : 'loggedIn__img-main'}`} />
            </Link>
        </nav>

    );
  }

  export default LoggedIn;