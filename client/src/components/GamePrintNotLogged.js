import React from 'react';
import '../pagestyle.css';
import CommentsModalNotLogged from './CommentsModalNotLogged';

function GamePrintNotLogged(props) {
  let totalRating = 0;
  for (let number of props.rating) {
    totalRating += +number;
  }

  let averageRating = (totalRating / props.rating.length).toFixed(2);
  if (isNaN(averageRating)) {
    averageRating = 0;
  }

  return (
    <div
      className="game-flex-container"
      style={{
        background: `linear-gradient(
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.55)
          ), url(${props.background}) center`,
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover',
        border: '5px solid red',
      }}
    >
      <h1 className="game-title">{props.title}</h1>
      <p className="game-desc"><strong>Resumo:</strong> {props.resume}</p>
      <p className="game-desc"><strong>Desenvolvedor:</strong> {props.developer}</p>
      <p className="game-desc"><strong>Gênero:</strong> {props.genre}</p>
      <p className="game-rating">
        Your friends have rated this game{' '}
        <span style={{ fontSize: '1.2em'}}>
          {averageRating}/10⭐
        </span>{' '}
        stars on average.
      </p>
      <CommentsModalNotLogged
        gameId={props.gameId}
        handleGetSavedGames={props.handleGetSavedGames}
        comments={props.comments}
      />
    </div>
  );
}

export default GamePrintNotLogged;
