import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useValidation from "../../utils/Validation";
import './Login.css';

function Login({ onLogin, errorMessage }) {

  const {inputValue, errors, isValid, handleChange, resetValidation} = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(inputValue);
  }

  useEffect(() => {resetValidation({})}, [resetValidation]);

  return (
    <main className='main'>
      <section className='signin'>
        <Link className='signin__link-logo' to='/' />
        <h1 className='signin__title'>Рады видеть!</h1>
        <form className='signin__form' onSubmit={handleSubmit}>
          <label className='signin__label'>
            E-mail
            <input
              className={`signin__input ${!errors.email ? '' : 'signin__inputNotValid'}`}
              type='email'
              name='email'
              autoComplete='off'
              placeholder=''
              value={inputValue.email || ''}
              pattern='^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$'
              required
              onChange={handleChange}
            />
          </label>
          <span className='signin__error'>{errors.email || ''}</span>
          <label className='signin__label'>
            Пароль
            <input
              className={`signin__input ${!errors.password ? '' : 'signin__inputNotValid'}`}
              type='password'
              name='password'
              autoComplete='off'
              placeholder=''
              minLength={3}
              maxLength={20}
              value={inputValue.password || ''}
              required
              onChange={handleChange}
            />
          </label>
          <span className='signin__error'>{errors.password || ''}</span>
          <span className='signin__errorMessage'>{errorMessage}</span>
          <button className={`signin__submit-button ${isValid ? '' : 'signin__submit-button_disable'}`} type='submit' disabled={!isValid}>
            Войти
          </button>
          <p className='signin__text'>
            Ещё не зарегистрированы?
            <Link className='signin__link' to='/signup'>Регистрация</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;