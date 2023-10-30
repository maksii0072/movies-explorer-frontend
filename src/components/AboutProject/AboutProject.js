import './AboutProject.css';

function AboutProject() {
  return (
<>
      <section className="about-project" id="about">
        <div className="about-project__container">
          <h2 className="about-project__title section-title">О&nbsp;проекте</h2>
          <div className="about-project__content">
            <div className="about-project__info">
              <h3 className="about-project__info-header">Дипломный проект включал 5&nbsp;этапов</h3>
              <p className="about-project__info-description">
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
              </p>
            </div>
            <div className="about-project__info">
              <h3 className="about-project__info-header">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
              <p className="about-project__info-description">
                У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
              </p>
            </div>
          </div>
          <div className="about-project__time">
            <h3 className="about-project__time-header about-project__time-header_green">1&nbsp;неделя</h3>
            <h3 className="about-project__time-header">4&nbsp;недели</h3>
            <p className="about-project__time-description">Back-end</p>
            <p className="about-project__time-description">Front-end</p>
          </div>
        </div>
      </section>
  </>
  );
}

export default AboutProject;
