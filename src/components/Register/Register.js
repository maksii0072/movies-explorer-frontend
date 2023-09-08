import '../Form/Form.css';
import Form from '../Form/Form';

function Register() {
  return (
    <main >
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin">
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
        placeholder="Укажите ваш имя"
        required
      />
      <span className="form__input-error"></span>
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
        className="form__input"
        id="password-input"
        type="password"
        minLength="2"
        maxLength="40"
        placeholder="Укажите ваш пароль"
        required
      />
      <span className="form__input-error"></span>
    </Form>
    </main>
  );
}

export default Register;