import './AboutMe.css';
import photo from '../../images/photo.JPG';
import Section from '../Section/Section';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe(props) {
  return (
    <Section title="Студент">
      <div className="about-me__wrapper">
        <div className="about-me__info">
          <h3 className="about-me__name">Максим</h3>
          <p className="about-me__title">Фронтенд-разработчик, 35&nbsp;лет</p>
          <p className="about-me__subtitle">
          Я родился в Ростовской области. Живу в Москве. Закончил Ростовский институт по специальности: Автоматизированные системы обработки информации и управления. В свободное время от работы, я люблю читать книги, играть на гитаре, а в остальное время повышаю навыки Веб-разработки.
          </p>
          <ul className="about-me__social">
            <li className="about-me__social-item">
              <a className="about-me__social-link" href="https://vk.com/feed" target="_blank" rel="noreferrer">VK</a>
            </li>
            <li className="about-me__social-item">
              <a className="about-me__social-link" href="https://github.com/maksii0072" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
        <img className="about-me__avatar" src={photo} alt="фото студента"/>
      </div>
      <Portfolio />
    </Section>
  )
}

export default AboutMe;