import './Techs.css';

function Techs({}) {
  return (
    <section className='techs'>
        <h2 className='techs__subtitle'>Технологии</h2>
        <h3 className='techs__title'>7 технологий</h3>
        <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs__progress'>
          <li className='techs__item'>
            <p className='techs__caption'>HTML</p>
          </li>
          <li className='techs__item'>
            <p className='techs__caption'>CSS</p>
          </li>
          <li className='techs__item'>
            <p className='techs__caption'>JS</p>
          </li>
          <li className='techs__item'>
            <p className='techs__caption'>React</p>
          </li>
          <li className='techs__item'>
            <p className='techs__caption'>Git</p>
          </li>
          <li className='techs__item'>
            <p className='techs__caption'>Express.js</p>
          </li>
          <li className='techs__item'>
            <p className='techs__caption'>mongoDB</p>
          </li>
        </ul>
    </section>
  );
}

export default Techs;