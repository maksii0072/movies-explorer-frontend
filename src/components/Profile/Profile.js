import { useContext, useEffect, useState } from 'react';
import useValidation from "../../utils/Validation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './Profile.css';

function Profile({ signOut, onUpdateUser, isEditing, onEditing, errorMessage }) {
  const [isFormDirty, setFormDirty] = useState(false);
  const {inputValue, errors, isValid, handleChange, resetValidation} = useValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(inputValue);
  }

  useEffect(() => {resetValidation({ name: currentUser.name, email: currentUser.email })}, [currentUser]);

  useEffect(() => {
    setFormDirty((currentUser.name !== inputValue.name) || (currentUser.email !== inputValue.email));
  }, [inputValue, currentUser, isValid]);

  return (
    <main className='main'>
      <section className='profile'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}`}</h1>
        <form className='profile__form' onSubmit={handleSubmit} noValidate>
          <label className='profile__label'>
            Имя
            <input
              className={`profile__input ${!errors.name ? '' : 'profile__inputNotValid'} ${!isEditing ? '' : 'profile__input-editing'}`}
              type='text'
              name='name'
              placeholder=''
              minLength={2}
              maxLength={40}
              value={inputValue.name || ''}
              required
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </label>
          <span className='profile__error'>{errors.name || ''}</span>
          <label className='profile__label'>
            E-mail
            <input
              className={`profile__input ${!errors.email ? '' : 'profile__inputNotValid'} ${!isEditing ? '' : 'profile__input-editing'}`}
              type='email'
              name='email'
              autoComplete='off'
              placeholder=''
              value={inputValue.email || ''}
              pattern='^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$'
              required
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </label>
          <span className='profile__error'>{errors.email || ''}</span>
          {
            !isEditing ? (
              <>
                <span className='profile__errorMessage'>{errorMessage}</span>
                <button className='profile__button' type='button' onClick={onEditing}>Редактировать</button>
                <button className='profile__signout' type='button' onClick={signOut}>Выйти из аккаунта</button>
              </>
            ) : (
              <>
                <button className={`profile__submit-button ${isValid ? '' : 'profile__submit-button_disable'} ${isFormDirty ? '' : 'profile__submit-button_disable'} `} type='submit' disabled={!isValid || !isFormDirty} >
                  Сохранить
                </button>
              </>
            )
          }
        </form>
      </section>
    </main>
  );
}

export default Profile;
