import React from 'react';
import '../Form/Form.css';
import Form from '../Form/Form';
import './Login.css';

function Login() {
  return (
    <>
      <Form
       className='form'
        title="Рады видеть!"
        buttonText="Войти"
        question="Еще не зарегистрированы?"
        linkText=" Регистрация"
        link="/signup">
        <label className="form__field">
          E-mail
        </label>
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          placeholder="Укажите ваш email"
          required
        />
        <span className="form__input-error"></span>
        <label className="form__field">
          Пароль
        </label>
        <input
          name="password"
          className="form__input form__input-margin"
          id="password-input"
          type="password"
          placeholder="Укажите ваш пароль"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error"></span>
      </Form>
    </>
  );
}

export default Login;
