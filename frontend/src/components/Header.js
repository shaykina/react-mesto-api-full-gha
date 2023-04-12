import React from 'react';
import logo from '../images/logo.svg';

function Header({ children }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия" />
      {children}
    </header>
  );
}

export default Header;
