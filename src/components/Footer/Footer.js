import './Footer.css';

function Footer({}) {
  return (
    <footer className='footer'>
        <h2 className='footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className='footer__info'>
          <p className="footer__year">&copy;{new Date().getFullYear()}</p>
          <ul className="footer__links">
            <li className='footer__item'>
              <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className='footer__item'>
              <a className="footer__link" href="https://github.com/Sitarweb" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
    </footer>
  );
}

export default Footer;