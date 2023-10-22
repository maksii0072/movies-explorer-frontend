import {useState, useEffect} from 'react';
import '../../index.css';
import './App.css';
import '../Header/Header';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import * as moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';


function App() {

const [isLoading, setIsLoading] = useState(false);
const [movies, setMovies] = useState([]);
const [savedMovies, setSavedMovies] = useState([]);
const [apiMovies, setApiMovies] = useState([]);
const [isShortMovies, setIsShortMovies] = useState(false);
const [moviesError, setMoviesError] = useState(false);
const [notFound, setNotFound] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [registerMessage, setRegisterMessage] = useState('');
const [loginMessage, setLoginMessage] = useState('');
const [currentUser, setCurrentUser] = useState({});
const [editProfileMessage, setEditProfileMessage] = useState('');
const [isSucced, setIsSucced] = useState(false);
const [token, setToken] = useState(false);

const history = useHistory();
const location = useLocation();

function handleShortMovies(e) {
  setIsShortMovies(e.target.checked);
}

function handleRegister(name, email, password) {
  setIsSubmitting(true);
  mainApi.signup(name, email, password)
    .then((res) => {
      console.log(res);
      setRegisterMessage('');
      setIsSubmitting(false);
      history.push('/signin');
    })
    .catch((err) => {
      console.log(err);
      if(err === 'Error: 400 Bad Request') {
        setRegisterMessage('Данные невалидны');
      }
      else if(err === 'Error: 409 Conflict') {
        setRegisterMessage('Пользователь с таким email уже существует :)');
      }
      else {
        setRegisterMessage('Что-то пошло не так, попробуйте ещё раз :(');
      }

    })
    .finally(() => {
      setIsSubmitting(false);
    })
}

function handleLogin(email, password) {
  setIsSubmitting(true);
  mainApi.signin(email, password)
    .then((res) => {
      setIsLoggedIn(true);
      localStorage.setItem("jwt", res.token)
      setToken(localStorage.getItem('jwt'));
      setLoginMessage('');
      history.push('/movies');
    })
    .catch((err) => {
      console.log(err);
      if(err === "Error: 401 Unauthorized") {
        setLoginMessage("Неправильные почта или пароль");
      }
      else {
        setLoginMessage("Что-то пошло не так, попробуйте ещё раз :(")
      }
    })
}

function handleEditUserInfo(name, email) {
  mainApi.editProfileInfo(name, email, token)
    .then((res) => {
      if(res.message) {
        setEditProfileMessage(res.message);
        setIsSucced(false);
      }
      setCurrentUser(res);
      setEditProfileMessage('Данные успешно обновлены :)');
      setIsSucced(true);
    })
    .catch((err) => {
      setEditProfileMessage('Произошла ошибка :(');
      setIsSucced(false);
    })
}

function handleSignout() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('movies');
  setApiMovies([]);
  setMovies([]);
  setIsLoggedIn(false)
  history.push('/');
}



function searchMoviesByKeyword(movies, keyword) {
  let foundMovies = [];

  movies.forEach((movie) => {
    if(movie.nameRU.indexOf(keyword) > -1) {
      if(isShortMovies) {
        movie.duration <= 40 && foundMovies.push(movie);
      }
      else {
        foundMovies.push(movie);
      }
    }
  })

  return foundMovies;
}

function checkToken() {
  if(localStorage.getItem('jwt')) {
    let token = localStorage.getItem('jwt');
    const movies = JSON.parse(localStorage.getItem('movies'));
    setToken(token);
    mainApi.getProfileInfo(token)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        setMovies(movies);
        history.push('/movies')
      })
      .catch(err => console.log(err));
  }
}

function searchMovies(keyword) {
  setIsLoading(true);
  setMovies([]);
  setNotFound(false);
  setMoviesError(false);

  if(apiMovies.length === 0) {
    moviesApi.getMovies()
    .then(resMovies => {
      setApiMovies(resMovies);
      const searchResult = searchMoviesByKeyword(resMovies, keyword);

      if(searchResult.length === 0) {
        setNotFound(true);
        setMovies([]);
      }
      else {
        localStorage.setItem('movies', JSON.stringify(searchResult));
        setMovies(JSON.parse(localStorage.getItem('movies')));
      }
    })
    .catch(err => {
      setMoviesError(true);
      setMovies([]);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }
  else {
    const searchResult = searchMoviesByKeyword(apiMovies, keyword);

    if(searchResult.length === 0) {
      setMovies([]);
      setIsLoading(false);
      setNotFound(true);
    }
    else if(searchResult.length !== 0) {
      localStorage.setItem('movies', JSON.stringify(searchResult));
      setMovies(JSON.parse(localStorage.getItem('movies')));
      setIsLoading(false);
    }
    else {
      setMoviesError(true);
      setMovies([]);
    }
  }
}

function searchSavedMovies(keyword) {
  const movies = JSON.parse(localStorage.getItem('savedMovies'));
  const searchResult = searchMoviesByKeyword(movies, keyword);
  setSavedMovies(searchResult);
}

function saveMovie(movie) {
  mainApi.saveMovie(movie, token)
    .then((data) => {
      const movies = [...savedMovies, data];
      setSavedMovies(prev => ([...prev, data]));
      localStorage.setItem('savedMovies', JSON.stringify(movies))
      console.log(movie);
    })
    .catch(err => console.log(`Error: ${err}`));
    console.log(localStorage.getItem('jwt'));
}

function deleteMovie(movieId) {
  mainApi.deleteMovie(movieId, token)
    .then((res) => {
      const filteredsavedMovies = savedMovies.filter((item) => {
        return item._id !== movieId
      });
      setSavedMovies(filteredsavedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(filteredsavedMovies));
    })
    .catch(err => console.log(`Error: ${err}`));
}

useEffect(() => {
  checkToken();
}, [history, isLoggedIn])

useEffect(() => {
  if(isLoggedIn) {
  mainApi.getSavedMovies(token)
    .then((res) => {
      const films = res.filter((item) => item.owner === currentUser._id)
      setSavedMovies(films);
    })
    .catch(err => console.log(err));
  }
}, [location])

  return (
    <CurrentUserContext.Provider value={currentUser}>

    <div className='app'>
      <div className='app__container'>

        <Switch>
          <Route exact path='/'>
            <Header isLoggedIn={isLoggedIn}/>
            <Main/>
            <Footer/>
          </Route>
          <ProtectedRoute path='/profile' isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn}/>
            <Profile handleSignout={handleSignout} editProfileMessage={editProfileMessage} isSubmitting={isSubmitting} handleEditUserInfo={handleEditUserInfo} isSucced={isSucced} />
          </ProtectedRoute>
          <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn}/>
            <Movies
              moviesError={moviesError}
              notFound={notFound}
              handleSearchMovies={searchMovies}
              movies={movies}
              isLoading={isLoading}
              handleShortMovies={handleShortMovies}
              isShortMovies={isShortMovies}
              handleSaveMovie={saveMovie}
              handleDeleteMovie={deleteMovie}
            />
            <Footer/>
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn}/>
            <SavedMovies
              movies={savedMovies}
              moviesError={moviesError}
              notFound={notFound}
              handleSearchSavedMovies={searchSavedMovies}
              isShortMovies={isShortMovies}
              handleDeleteMovie={deleteMovie}
              handleShortMovies={handleShortMovies}
            />
            <Footer/>
          </ProtectedRoute>
          <Route path='/signup'>
              <Register handleRegister={handleRegister} errorMessage={registerMessage} isSubmitting={isSubmitting}/>
          </Route>
          <Route path='/signin'>
              <Login handleLogin={handleLogin} errorMessage={loginMessage} isSubmitting={isSubmitting} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
