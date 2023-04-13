import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import success from '../images/succes.svg';
import fail from '../images/fail.svg';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userMail, setUserMail] = React.useState('');
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [loginInfo, setLoginInfo] = React.useState({
    email: '',
    password: ''
  });
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  function handleLogin() {
    if (!loginInfo.email || !loginInfo.password) {
      return;
    }

    auth.authorize(loginInfo.email, loginInfo.password)
      .then((data) => {
        if (data.token) {
          setLoginInfo({ email: '', password: '' });
          setIsLoggedIn(true);
          handleTokenCheck();
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        handleRegisterFail();
        console.log(err);
      });
  }

  function handleRegister() {
    auth.register(formValue.email, formValue.password)
      .then(() => {
        handleRegisterSuccess();
        navigate('/signin', { replace: true });
      })
      .catch((err) => {
        handleRegisterFail();
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem('token');
  }

  function handleRegisterSuccess() {
    setIsRegisterPopupOpen(true);
    setLink(success);
    setTitle("Вы успешно зарегистрировались!");
  }

  function handleRegisterFail() {
    setIsRegisterPopupOpen(true);
    setLink(fail);
    setTitle("Что-то пошло не так! Попробуйте ещё раз.");
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  const navigate = useNavigate();

  function handleTokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token).then((res) => {
        setIsLoggedIn(true);
        navigate('/', { replace: true });
        setUserMail(res.email);
      })
    }
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards().then((cards) => {
        setCards(cards);
      })
        .catch((err) => {
          console.log(err);
        });

      api.getUserInfo().then((user) => {
        setCurrentUser(user);
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsRegisterPopupOpen(false);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter(item => item._id != card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    isLiked ?
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        }) :
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
  }

  function handleUpdateUser(info) {
    api.saveNewUserInfo(info)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api.uploadAvatar(link.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
          <PopupWithForm
            name="popup_delete"
            title="Вы уверены?"
            buttonText="Да" />
          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard} />
          <InfoTooltip
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
            link={link}
            title={title} />

          <Routes>
            <Route path="/signin" element={
              <div className="loginContainer">
                <Header
                  children={
                    <Link className="header__link" to="/signup">Регистрация</Link>
                  }
                />
                <Login onLogin={handleLogin} loginInfo={loginInfo} setLoginInfo={setLoginInfo} />
              </div>} />
            <Route path="/signup" element={
              <div className="registerContainer">
                <Header
                  children={
                    <Link className="header__link" to="/signin">Войти</Link>
                  }
                />
                <Register onRegister={handleRegister} formValue={formValue} setFormValue={setFormValue} />
              </div>} />
            <Route path="/*" element={
              <ProtectedRouteElement isLoggedIn={isLoggedIn} element={
                <>
                  <Header
                    children={
                      <div className="header__container">
                        <p className="header__mail">{userMail}</p>
                        <Link className="header__link header__link_exit" to="/signin" onClick={signOut}>Выйти</Link>
                      </div>
                    }
                  />
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                  <Footer />
                </>
              } />
            } />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
