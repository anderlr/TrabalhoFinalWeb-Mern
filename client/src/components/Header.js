import React from 'react';
import '../pagestyle.css';
import AddGameModal from './AddGameModal';
import RegisterModal from './RegisterModal';

function Header(props) {
  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <nav className="nav header-custom">
        <AddGameModal handleGetSavedGames={props.handleGetSavedGames} />
        <button
          style={{ backgroundColor: '#ff6363', color: 'white' }}
          className="btn header-button"
          onClick={() => logout()}
        >
          Log-out
        </button>
        <RegisterModal handleGetSavedGames={props.handleGetSavedGames} />
      </nav>
    </>
  );
}

export default Header;
