import './AboutMe.css';
import photo from '../../images/photo.JPG';

function AboutMe() {
  return (
    <>
      <section className="about-me" id="about-me">
        <h2 className="about-me__title section-title">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__content">
            <h3 className="about-me__heading">Максим</h3>
            <p className="about-me__info">Фронтенд-разработчик, 35&nbsp;лет</p>
            <p className="about-me__description">
              Я родился в Ростовской области. Живу в Москве. Закончил Ростовский институт по специальности: Автоматизированные системы обработки информации и управления. В свободное время от работы, я люблю читать книги, играть на гитаре, а в остальное время повышаю навыки Веб-разработки.
            </p>
            <a
              href="https://github.com/maksii0072"
              className="about-me__link"
              target="_blank"
              rel="noreferrer"
              title="Профиль на GitHub"
              >
              Github
            </a>
          </div>
          <img src={photo} alt="фото студента" className="about-me__photo" />
        </div>
      </section>
      </>
  );
}

export default AboutMe;
