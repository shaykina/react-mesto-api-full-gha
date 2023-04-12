import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  const user = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === user._id;
  const isLiked = props.card.likes.some(i => i._id === user._id);

  const cardLikeButtonClassName = (
    `button card__like ${isLiked && 'card__like_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <article className="card">
      <img className="card__image" alt={props.name} src={props.link} onClick={handleClick} />
      <div className="card__caption">
        <h2 className="card__title">{props.name}</h2>
        {isOwn && <button className='button card__trash' onClick={handleDeleteClick} />}
        <div className="card__like-area">
          <button className={cardLikeButtonClassName} type="button" aria-label="кнопка лайк" onClick={handleLikeClick} />
          <p className="card__like-number">{props.likesNumber}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
