import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      name="popup_add"
      title="Новое место"
      buttonText="Создать">
      <label className="popup__field">
        <input className="popup__input popup__input_type_place-name" type="text" value={name || ''} onChange={handleNameChange} name="name" id="place-name"
          placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__error place-name-error"></span>
      </label>
      <label className="popup__field">
        <input className="popup__input popup__input_type_link" type="url" value={link || ''} onChange={handleLinkChange} name="link" id="link"
          placeholder="Ссылка на картинку" required />
        <span className="popup__error link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
