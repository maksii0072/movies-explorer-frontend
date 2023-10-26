import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import "./App.css";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import SideBar from '../SideBar/SideBar';
import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { REGISTRATION_ERROR, AUTHORIZATION_ERROR, EMAIL_ERROR, UPDATE_PROFILE_ERROR } from '../../utils/Constants/constants';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = window.location.pathname;

  // Переменные внутреннего состояния
  const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);
  const [isPreloaderPopupOpen, setPreloaderPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') || false);
  const [registered, setRegistered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Открытие попапов
  const handleMenuPopupClick = () => setMenuPopupOpen(true);

  // Закрытие попапов по кнопке
  const closeAllPopups = () =>{
    setMenuPopupOpen(false);
  }

  // Закрытие по esc
  function handleEscClose(evt) {
    if (evt.key === 'Escape') closeAllPopups();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  });

  // Закрытие по оверлею
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) closeAllPopups();
  }

  // Редактирует информацию о пользователе
  const handleEditingClick = () => setIsEditing(true);

  // Сохраняет отредактированную информацию
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    mainApi.getJwt();
    if (loggedIn) {
      mainApi
        .getAllNeededData()
        .then(([userInfo, savedMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(savedMovies);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;
    setLoggedIn(true);
    navigate(location);
    auth
      .getCurrentUser(jwt)
      .then((response) => {
        setLoggedIn(true);
        setCurrentUser({
          name: response.name,
          email: response.email
        });
      })
      .catch(console.error);
  }, [navigate, location]);

  useEffect(() => {
    setErrorMessage('');
  }, [navigate]);

  function handleRegister({ name, email, password }) { // Регестрирует пользователя
    setPreloaderPopupOpen(true);
    auth
      .signup({ name, email, password })
      .then((response) => {
        if (response.status !== 409) {
          setCurrentUser({
            name: response.name,
            email: response.email
          });
          handleLogin({email, password});
        } else setErrorMessage(EMAIL_ERROR);
      })
      .catch(() => {
        setErrorMessage(REGISTRATION_ERROR);
        setRegistered(false);
      })
      .finally(() => setPreloaderPopupOpen(false));
  }

  function handleLogin({ email, password }) { // Позволяет пользователю войти в аккаунт
    setPreloaderPopupOpen(true);
    auth
      .signin({ email, password })
      .then((response) => {
        localStorage.setItem('jwt', response.token);
        localStorage.setItem('loggedIn', true);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch(() => {
        setErrorMessage(AUTHORIZATION_ERROR);
        setRegistered(false);
      })
      .finally(() => setPreloaderPopupOpen(false));
  }

  function handleUpdateUser(data) { // Обновляет данные о пользователе
    setPreloaderPopupOpen(true);
    mainApi
      .patchUserInfo(data)
      .then(() => {
        setCurrentUser(data);
        handleSaveClick();
        setErrorMessage('Данные успешно обновлены!');
      })
      .catch(() => {
        setErrorMessage(UPDATE_PROFILE_ERROR);
      })
      .finally(() => setPreloaderPopupOpen(false));
  }

  function handleSignOut() { // Позволяет пользователю выйти из аккаунта
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  }

  function handleSaveMovie(data) { // Добавляет фильм в сохраненные
    mainApi
      .postNewMovie(data)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch(console.error);
  }

  function handleDeleteMovie(movieId) { // Удаляет фильм из сохраненных
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movieId));
      })
      .catch(console.error);
  }

  return (
    <div className={`app ${pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? 'app_movies' : ''}`}>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header
                  loggedIn={loggedIn}
                  onMenuPopup={handleMenuPopupClick}
                />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Header}
                    onMenuPopup={handleMenuPopupClick}
                />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Movies}
                    savedMovies={savedMovies}
                    onSaveMovie={handleSaveMovie}
                    onDeleteMovie={handleDeleteMovie}
                    setPreloaderPopupOpen={setPreloaderPopupOpen}
                />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Footer}
                />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Header}
                    onMenuPopup={handleMenuPopupClick}
                />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={SavedMovies}
                    savedMovies={savedMovies}
                    onDeleteMovie={handleDeleteMovie}
                />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Footer}
                />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Header}
                    onMenuPopup={handleMenuPopupClick}
                />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Profile}
                    signOut={handleSignOut}
                    onUpdateUser={handleUpdateUser}
                    isEditing={isEditing}
                    onEditing={handleEditingClick}
                    errorMessage={errorMessage}
                />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <ProtectedRoute
                  loggedIn={!loggedIn}
                  component={Register}
                    onRegister={handleRegister}
                    errorMessage={errorMessage}
                />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <ProtectedRoute
                  loggedIn={!loggedIn}
                  component={Login}
                    onLogin={handleLogin}
                    errorMessage={errorMessage}
                />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <NotFound />
              </>
            }
          />
        </Routes>

        <SideBar
          isOpen={isMenuPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        />

        <Preloader isOpen={isPreloaderPopupOpen} />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;