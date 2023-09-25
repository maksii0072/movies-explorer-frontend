import { Link } from 'react-router-dom';
import './Form.css';
import logo from '../../images/logo.svg';

function Form({
  children,
  title,
  buttonText,
  question,
  linkText,
  link,
  onSubmit,
  isDisabled,
  isLoading,
}) {
  return (
    <>
    <div className="form">
      <Link to="/" className="form__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <h1 className="form__title">{title}</h1>
      <form className="form__save" id="form" onSubmit={onSubmit} noValidate>
      {children}
        <button type="submit"
          disabled={isDisabled ? true : false}
          class={isDisabled || isLoading
            ? 'form__button-save form__button-save_inactive'
            : 'form__button-save'
          }>
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </div>
    </>
  );
}

export default Form;