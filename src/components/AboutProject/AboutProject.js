import './AboutProject.css';
import Section from '../Section/Section';

function AboutProject(props) {
  return (
    <Section title="О проекте">
      <div className="about__text-columns">
        <div className="about__text-column">
          <h3 className="about__text-header">Дипломный проект включал 5 этапов</h3>
          <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about__text-column">
          <h3 className="about__text-header">На выполнение диплома ушло 5 недель</h3>
          <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__progress">
        <span className="about__progress-back"></span>
        <span className="about__progress-front"></span>
      </div>
    </Section>
  )
}

export default AboutProject;