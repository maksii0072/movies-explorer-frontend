import '../Form/Form.css';
import Form from '../Form/Form';
import useForm from '../../hooks/useForm';
import { EMAIL_REGEX } from '../../utils/Constants/constants';
import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";

function Login({ onLogin, isLoading, loggedIn, authError, setAuthError }) {
  const { enteredValues, errors, handleChange, isFormValid } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
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
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
      isLoading={isLoading}>
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
        onChange={handleChange}
        value={enteredValues.password || ''}
      />
      <span className="form__input-error">{errors.password}</span>

      {authError}
    </Form>
  );
}

export default Login;
