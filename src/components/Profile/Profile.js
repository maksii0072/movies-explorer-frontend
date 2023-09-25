import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import '../Form/Form.css';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useForm from '../../hooks/useForm';
import { USER_REGEX } from '../../utils/constants';
import { EMAIL_REGEX } from '../../utils/constants';

function Profile({
  handleMenuClick,
  menuOpen,
  closePopups,
  loggedIn,
  handleUpdateUser,
  isLoading,
  handleSignOut,
  isSuccess,
  InfoTooltipPopup
}) {
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();
  const [isLastValues, setIsLastValues] = useState(false);


  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (currentUser.name === enteredValues.name && currentUser.email === enteredValues.email) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });

  }

  return (
    <section className="profile">
      <BurgerMenu
        menuOpen={menuOpen}
        closePopups={closePopups} />
      <Header loggedIn={loggedIn} handleMenuClick={handleMenuClick} />
      <main className='profile__container'>
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form id="form" className="profile__form" onSubmit={handleSubmit} noValidate>
          <div className='profile__row'>
            <label className="profile__field">
              Имя
            </label>
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={enteredValues.name || ''}
              pattern={USER_REGEX}
              required
            />
            <span className="profile__input-error">{errors.name}</span>
          </div>
          <div className="profile__border"></div>
          <div className='profile__row'>
            <label className="profile__field">
              E-mail
            </label>
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              onChange={handleChange}
              pattern={EMAIL_REGEX}
              value={enteredValues.email || ''}
              required
            />
            <span className="profile__input-error">{errors.email}</span>
          </div>
          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? 'profile__button-save form__button-save_inactive'
                : 'profile__button-save'
            }
          >
            Редактировать
          </button>
          <button type="button" className="profile__button-logout profile__button" onClick={handleSignOut}>
            Выйти из аккаунта
          </button>
        </form>
      </main>
    </section>
  );
}

export default Profile;