  import './Portfolio.css';
  import arrow from '../../images/arrow.svg';

  function Portfolio() {
    return (
      <main >
      <section className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <nav>
        <ul  className="portfolio__list">
          <li>
            <a
              href="https://github.com/maksii0072/how-to-learn.git"
              className="portfolio__link portfolio__link-border"
              target="_blank"
              rel="noreferrer">
              <p className="portfolio__text">Статичный сайт</p>
              <img className="portfolio__image" src={arrow} alt="стрелка" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/maksii0072/russian-travel.git"
              className="portfolio__link portfolio__link-border"
              target="_blank"
              rel="noreferrer">
              <p className="portfolio__text">Адаптивный сайт</p>
              <img className="portfolio__image" src={arrow} alt="стрелка" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/maksii0072/express-mesto-gha.git"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer">
              <p className="portfolio__text">Одностраничное приложение</p>
              <img className="portfolio__image" src={arrow} alt="стрелка" />
            </a>
          </li>
        </ul>
        </nav>
      </section>
      </main>
    );
  }

  export default Portfolio;