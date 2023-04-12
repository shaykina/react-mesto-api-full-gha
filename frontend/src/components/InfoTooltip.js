import React from 'react';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="button popup__close" type="button" aria-label="кнопка закрытия попапа" onClick={props.onClose} />
        <img className="popup__register-image" src={props.link} alt={props.title} />
        <h1 className="popup__register-text">{props.title}</h1>
      </div>
    </div>
  )
}

export default InfoTooltip;
