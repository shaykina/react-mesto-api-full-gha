import React from 'react';

function PopupWithForm({ isOpen, onClose, title, name, buttonText, children, onSubmit }) {
  const formRef = React.useRef();

  React.useEffect(() => {
    if (!isOpen) {
      formRef.current.reset();
    }
  }, [isOpen]);

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="button popup__close" onClick={onClose} type="button" aria-label="кнопка закрытия попапа" />
        <h2 className="popup__heading">{title}</h2>
        <form className="popup__form" name={name} ref={formRef} onSubmit={onSubmit}>
          <fieldset className="popup__fieldset">
            {children}
          </fieldset>
          <button className="popup__submit" type="submit">{buttonText || "Сохранить"}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
