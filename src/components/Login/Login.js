import '../Form/Form.css';
import Form from '../Form/Form';
import useForm from '../../hooks/useForm';
import { EMAIL_REGEX } from '../../utils/Constants/constants';

function Login({ onLogin, isLoading }) {
  const { enteredValues, errors, handleChange, isFormValid } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line no-lone-blocks
    {onLogin({
      email: enteredValues.email,
      password: enteredValues.password,
    })};
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
    </Form>
  );
}

export default Login;