import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className='footer__list'>
        <li className='footer__item'>
          <a
          href="https://practicum.yandex.ru"
          className="footer__link"
          target="_blank"
          rel="noreferrer">
          Яндекс.Практикум
        </a>
        </li>
        <li className='footer__item'>
        <a
          href="https://github.com/yandex-praktikum"
          className="footer__link"
          target="_blank"
          rel="noreferrer">
          Github
        </a>
        </li>

        </ul>
        

      </div>
    </footer>
  );
}

export default Footer;