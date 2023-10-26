import './AboutMe.css';
import photo from '../../images/photo.JPG';

function AboutMe({}) {
  return (
    <section className='aboutMe'>
        <h2 className='aboutMe__subtitle'>Студент</h2>
        <div className='aboutMe__biography'>
          <div className='aboutMe__bio'>
            <h3 className='aboutMe__name'>Максим</h3>
            <h4 className='aboutMe__work'>Фронтенд-разработчик, 35&nbsp;лет</h4>
            <p className='aboutMe__description'> Я родился в Ростовской области. Живу в Москве. Закончил Ростовский институт по специальности: Автоматизированные системы обработки информации и управления. В свободное время от работы, я люблю читать книги, играть на гитаре, а в остальное время повышаю навыки Веб-разработки.</p>
            <a href="https://github.com/maksii0072"target='_blank' rel='noreferrer' className='aboutMe__git'>Github</a>
          </div>
          <img src={photo} alt='Фотография студента' className='aboutMe__photo' />
        </div>
    </section>
  );
}

export default AboutMe;