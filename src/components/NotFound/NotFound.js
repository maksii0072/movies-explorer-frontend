import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound({}) {
  const navigate = useNavigate();

  return (
    <main className="main">
      <section className='notFound'>
        <h1 className="notFound__title">404</h1>
        <p className="notFound__text">Страница не найдена</p>
        <button type='button' className="notFound__link" onClick={() => navigate(-1)}>Назад</button>
      </section>
    </main>
  );
}

export default NotFound;