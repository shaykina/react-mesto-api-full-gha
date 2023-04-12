import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register({ onRegister, formValue, setFormValue }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister();
  }

  return (
    <div className="auth">
      <h1 className="auth__header">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <label className="auth__field">
            <input className="auth__input auth__input_type_username" type="email" value={formValue.email || ''} onChange={handleChange} name="email" id="email" placeholder="Email"
              minLength="2" maxLength="40" required />
            <span className="auth__error username-error"></span>
          </label>
          <label className="auth__field">
            <input className="auth__input auth__input_type_password" type="password" value={formValue.password || ''} onChange={handleChange} name="password" id="password" placeholder="Пароль"
              minLength="2" maxLength="40" required />
            <span className="auth__error password-error"></span>
          </label>
        </fieldset>
        <button className="auth__submit" type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
      </form>

      <div className="auth__signin">
        <p className="auth__signin-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="auth__signin-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
