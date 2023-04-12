import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const user = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="popup_edit"
      title="Редактировать профиль">
      <label className="popup__field">
        <input className="popup__input popup__input_type_name" type="text" name="name" value={name || ''} onChange={handleNameChange} id="name" placeholder="Имя"
          minLength="2" maxLength="40" required />
        <span className="popup__error name-error"></span>
      </label>
      <label className="popup__field">
        <input className="popup__input popup__input_type_job" type="text" name="job" value={description || ''} onChange={handleDescriptionChange} id="job" placeholder="О себе"
          minLength="2" maxLength="200" required />
        <span className="popup__error job-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
