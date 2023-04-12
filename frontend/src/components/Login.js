import React from 'react';

function Login({ onLogin, loginInfo, setLoginInfo }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
  }

  return (
    <div className="auth">
      <h1 className="auth__header">Вход</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <label className="auth__field">
            <input className="auth__input auth__input_type_login-username" type="email" name="email" value={loginInfo.email || ''} onChange={handleChange} id="email" placeholder="Email"
              minLength="2" maxLength="40" required />
            <span className="auth__error username-error"></span>
          </label>
          <label className="auth__field">
            <input className="auth__input auth__input_type_login-password" type="password" name="password" value={loginInfo.password || ''} onChange={handleChange} id="password" placeholder="Пароль"
              minLength="2" maxLength="40" required />
            <span className="auth__error password-error"></span>
          </label>
        </fieldset>
        <button className="auth__submit" type="submit">Войти</button>
      </form>
    </div>

  );
}

export default Login;
