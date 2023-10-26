import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useValidation from "../../utils/Validation";
import './Register.css';



function Register({ onRegister, errorMessage }) {

  const {inputValue, errors, isValid, handleChange, resetValidation} = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(inputValue);
  }

  useEffect(() => {resetValidation()}, [resetValidation]);

  return (
    <main className='main'>
      <section className='signup'>
        <Link className='signup__link-logo' to='/' />
        <h1 className='signup__title'>Добро пожаловать!</h1>
        <form className='signup__form' onSubmit={handleSubmit} noValidate>
          <label className='signup__label'>
            Имя
            <input
              className={`signup__input ${!errors.name ? '' : 'signup__inputNotValid'}`}
              type='text'
              name='name'
              placeholder=''
              minLength={2}
              maxLength={40}
              value={inputValue.name || ''}
              required
              onChange={handleChange}
            />
          </label>
          <span className='signup__error'>{errors.name || ''}</span>
          <label className='signup__label'>
            E-mail
            <input
              className={`signup__input ${!errors.email ? '' : 'signup__inputNotValid'}`}
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
          <span className='signup__error'>{errors.email || ''}</span>
          <label className='signup__label'>
            Пароль
            <input
              className={`signup__input ${!errors.password ? '' : 'signup__inputNotValid'}`}
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
          <span className='signup__error'>{errors.password || ''}</span>
          <span className='signup__errorMessage'>{errorMessage}</span>
          <button className={`signup__submit-button ${isValid ? '' : 'signup__submit-button_disable'}`} type='submit' disabled={!isValid}>
            Зарегистрироваться
          </button>
          <p className='signup__text'>
            Уже зарегистрированы?
            <Link className='signup__link' to='/signin'>Войти</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
