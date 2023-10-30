import React, {useEffect} from 'react';
import '../Form/Form.css';
import Form from '../Form/Form';
import useForm from '../../hooks/useForm';
import { EMAIL_REGEX, USER_REGEX } from '../../utils/Constants/constants';
import {Navigate} from "react-router-dom";

function Register({ onRegistr, isLoading, loggedIn, authError, setAuthError }) {
  const { enteredValues, errors, handleChange, isFormValid } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onRegistr({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  useEffect(() => {
    return () => {
      setAuthError('')
    }
  }, []);

  if (loggedIn) {
    return <Navigate to='/' replace/>
  }

  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
      isLoading={isLoading}>
      <label className="form__field">
        Имя
      </label>
      <input
        name="name"
        className="form__input"
        id="name-input"
        type="text"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
        value={enteredValues.name || ''}
        pattern={USER_REGEX}
        title="Поле должно содержать только латиницу, кириллицу, пробел или дефис"
      />
      <span className="form__input-error">{errors.name}</span>
      <label className="form__field">
        E-mail
      </label>
      <input
        name="email"
        className="form__input"
        id="email-input"
        type="email"
        required
        onChange={handleChange}
        pattern={EMAIL_REGEX}
        value={enteredValues.email || ''}
      />
      <span className="form__input-error">{errors.email}</span>
      <label className="form__field">
        Пароль
      </label>
      <input
        name="password"
        className="form__input"
        id="password-input"
        type="password"
        required
        minLength={6}
        onChange={handleChange}
        value={enteredValues.password || ''}
      />
      <span className="form__input-error">{errors.password}</span>

      {authError}

    </Form>
  );
}

export default Register;
