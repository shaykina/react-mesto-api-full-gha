import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const user = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar" onClick={props.onEditAvatar} type="button" aria-label="редактировать аватар" style={{ backgroundImage: `url(${user.avatar})` }} />
        <div className="profile__main">
          <div className="profile__info">
            <h1 className="profile__name">{user.name}</h1>
            <p className="profile__job">{user.about}</p>
          </div>
          <button className="button profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="кнопка редактирования" />
        </div>
        <button className="button profile__add-button" onClick={props.onAddPlace} type="button" aria-label="кнопка добавления" />
      </section>
      <section className="elements" aria-label="карточки">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              name={card.name}
              link={card.link}
              likesNumber={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              card={card}
            />
          )
        })}
      </section>
    </main>
  );
}

export default Main;
