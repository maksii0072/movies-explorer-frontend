import './Portfolio.css';

function Portfolio({}) {
  return (
    <section className='portfolio'>
        <h2 className='portfolio__subtitle'>Портфолио</h2>
        <ul className='portfolio__links'>
          <li className='portfolio__item'>
            <a href="https://github.com/maksii0072/how-to-learn" target='_blank' rel='noreferrer' className='portfolio__link'>Статичный сайт<p className='portfolio__text'>&#8599;</p></a>
          </li>
          <li className='portfolio__item'>
            <a href="https://github.com/maksii0072/russian-travel" target='_blank' rel='noreferrer' className='portfolio__link'>Адаптивный сайт<p className='portfolio__text'>&#8599;</p></a>
          </li>
          <li className='portfolio__item'>
            <a href="https://github.com/maksii0072/express-mesto-gha" target='_blank' rel='noreferrer' className='portfolio__link'>Одностраничное приложение<p className='portfolio__text'>&#8599;</p></a>
          </li>
        </ul>
    </section>
  );
}

export default Portfolio;