import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_picture ${props.isOpen && 'popup_opened'}`}>
      <figure className="popup__figure">
        <button className="button popup__close" type="button" aria-label="кнопка закрытия попапа" onClick={props.onClose} />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__fidcaption">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
