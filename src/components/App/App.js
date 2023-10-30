import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as api from "../../utils/MainApi";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [InfoTooltipPopup, setInfoToolTipPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = localStorage.getItem("logged");

  useEffect(() => {
    // загрузка карточек с сервера
    if (loggedIn) {
      api
        .getSaveCards()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    // загрузка данных пользователя с сервера
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // открытие бурегр-меню
  function handleMenuClick() {
    setMenuOpen(true);
  }

  // закрытие попапов
  function closePopups() {
    setMenuOpen(false);
    setIsSuccess(true);
    setInfoToolTipPopup(false);
  }

  //регистрация пользователя
  function handleRegisterSubmit({ name, email, password }) {
    setIsAuthLoading(true);
    const userData = api
      .register({ name, email, password })
      .then(() => {
        if (userData) {
          handleLoginSubmit({ email, password });
          console.log(userData);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsAuthLoading(false);
        setInfoToolTipPopup(true);
      });
  }

  //авторизация пользователя
  function handleLoginSubmit({ email, password }) {
    setIsAuthLoading(true);
    const userData = api
      .login({ email, password })
      .then(() => {
        if (userData) {
          localStorage.setItem('hasJWT', 'true')
          localStorage.setItem("logged", true);
          setCurrentUser({ email, password });
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setAuthError(err)
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }

  function tokenCheck() {
    setIsLoading(true);
    api
      .getUserInfo()
      .then((res) => {
        localStorage.setItem("logged", true);
        setCurrentUser(res);
        navigate(location.pathname, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Проверка токена и авторизация пользователя
  useEffect(() => {
    const isLogged = localStorage.getItem('hasJWT')
    if (isLogged && isLogged === 'true') {
      tokenCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setInfoToolTipPopup(true);
      });
  }

  function handleSignOut() {
    api
      .logout()
      .then(() => {
        setCurrentUser({});
        localStorage.clear();
        localStorage.setItem('hasJWT', 'false')
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLikeClick(card, saved, setSaved) {
    if (!saved)
      api
        .postSaveCard(card)
        .then((newMovie) => {
          setSavedMovies([newMovie, ...savedMovies]);
          setSaved(true);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleCardDelete(movie, setSaved) {
    const savedMovie = savedMovies.find(
      (card) => card.movieId === movie.id || card.movieId === movie.movieId
    );
    api
      .deleteSaveCard(savedMovie._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== savedMovie._id)
        );
        setSaved(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page">
      <div className="page__content">
        {isLoading ? (
          <Preloader isLoading={isLoading} />
        ) : (
          <CurrentUserContext.Provider value={currentUser}>
            <Routes>
              <Route
                path="/"
                element={
                  <Main handleMenuClick={handleMenuClick} loggedIn={loggedIn} />
                }
              />
              <Route
                path="/signin"
                element={
                  <Login
                    loggedIn={loggedIn}
                    onLogin={handleLoginSubmit}
                    isLoading={isAuthLoading}
                    authError={authError}
                    setAuthError={setAuthError}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    onRegistr={handleRegisterSubmit}
                    isLoading={isAuthLoading}
                    loggedIn={loggedIn}
                    authError={authError}
                    setAuthError={setAuthError}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    signOut={handleSignOut}
                    onUpdateUser={handleUpdateUser}
                    loggedIn={loggedIn}
                    menuOpen={menuOpen}
                    closePopups={closePopups}
                    handleMenuClick={handleMenuClick}
                    handleCardDelete={handleCardDelete}
                    isLoading={isLoading}
                    handleLikeClick={handleLikeClick}
                    savedMovies={savedMovies}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    loggedIn={loggedIn}
                    menuOpen={menuOpen}
                    closePopups={closePopups}
                    handleMenuClick={handleMenuClick}
                    handleCardDelete={handleCardDelete}
                    handleLikeClick={handleLikeClick}
                    savedMovies={savedMovies}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    loggedIn={loggedIn}
                    menuOpen={menuOpen}
                    isSuccess={isSuccess}
                    closePopups={closePopups}
                    handleMenuClick={handleMenuClick}
                    isLoading={isLoading}
                    handleUpdateUser={handleUpdateUser}
                    handleSignOut={handleSignOut}
                  />
                }
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <InfoTooltip
              isSuccess={isSuccess}
              onClose={closePopups}
              InfoTooltipPopup={InfoTooltipPopup}
            />
          </CurrentUserContext.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
