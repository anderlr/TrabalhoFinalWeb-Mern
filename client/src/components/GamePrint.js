import React from 'react';
import '../pagestyle.css';
import CommentsModal from './CommentsModal';
import CommentsModalNotLogged from './CommentsModalNotLogged';
import { removeGame } from '../utils/API';

function GamePrint(props) {
  function handleremoveGame(gameId) {
    console.log('DELETE', gameId);
    removeGame(gameId)
      .then(props.handleGetSavedGames)
      .catch((err) => console.log(err));
  }

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
        Avaliação média:{' '}
        <span style={{ fontSize: '1.2em'}}>
          {averageRating}/10⭐
        </span>
      </p>
      {!localStorage.getItem(`${props.title}`) ? (
        <CommentsModal
          title={props.title}
          gameId={props.gameId}
          handleGetSavedGames={props.handleGetSavedGames}
          comments={props.comments}
        />
      ) : (
        <CommentsModalNotLogged
          gameId={props.gameId}
          handleGetSavedGames={props.handleGetSavedGames}
          comments={props.comments}
        />
      )}
      <button
        className="remove-game"
        onClick={() => handleremoveGame(props.gameId)}
      >
        DELETAR
      </button>
    </div>
  );
}

export default GamePrint;
