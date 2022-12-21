import React, { useRef, useState } from 'react';
import Select from 'react-select';
import '../pagestyle.css';
import Modal from 'react-bootstrap/Modal';
import { saveGame } from '../utils/API';

function NewGameModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const titleRef = useRef();
  const pictureRef = useRef();
  const resumeRef = useRef();
  const developerRef = useRef();
  const genreRef = useRef();
  const consoleRef = useRef();

  const genreOptions = [
    { value: 'action', label: 'Ação' },
    { value: 'adventure', label: 'Aventura' },
    { value: 'strategy', label: 'Estratégia' },
    { value: 'rpg', label: 'RPG' },
    { value: 'sports', label: 'Esporte' },
    { value: 'sim', label: 'Simulação' },
  ];

  const consoleOptions = [
    { value: 'xbox', label: 'XBOX' },
    { value: 'playStation', label: 'PlayStation' },
    { value: 'switch', label: 'Switch' },
    { value: 'pc', label: 'PC' },
  ];

  function refreshPage() {
    window.location.reload(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newGame = {
      title: titleRef.current.value,
      picture: pictureRef.current.value,
      resume: resumeRef.current.value,
      developer: developerRef.current.value,
      console: consoleRef.current,
      genre: genreRef.current,
    };
    console.log('GAME', newGame);
    console.log(`Adding game: ${newGame}`);
    saveGame(newGame).then((res) => {
      console.log(res);
      props.handleGetSavedGames();
      refreshPage();
    });

    handleClose();
  }

  function setGenre(event) {
    genreRef.current = event.label;
  }

  function setConsole(event) {
    consoleRef.current = event.value;
  }

  return (
    <>
      <button
        className="btn header-button-add"
        style={{
          margin: '0 auto',
          marginLeft: '0',
          backgroundColor: '#ff6363',
          color: 'white',
        }}
        onClick={handleShow}
      >
        Adicionar Jogo ➕
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{ backgroundColor: '#4C4E49', color: 'white' }}
          closeButton
        >
          <Modal.Title
            style={{ fontFamily: "'Roboto Slab', serif", fontSize: '30px' }}
          >
            Adicionar Jogo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: '#39AEC5',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
          }}
        >
          <form>
            <div className="form-group text-center">
              <label>Título: </label>
              <br />
              <input
                className="input"
                ref={titleRef}
                type="text"
                placeholder="Título do Jogo"
              />
            </div>
            <div className="form-group text-center">
              <label>Resumo: </label>
              <br />
              <textarea
                rows="2"
                className="input"
                ref={resumeRef}
                type="text"
                placeholder="Resumo do Jogo"
              />
            </div>
            <div className="form-group text-center">
              <label>Desenvolvedor: </label>
              <br />
              <textarea
                rows="2"
                className="input"
                ref={developerRef}
                type="text"
                placeholder="Desenvolvedor do Jogo"
              />
            </div>
            <div className="form-group text-center">
              <label>Console: </label>
              <br />
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={consoleOptions[0].value}
                name="console"
                options={consoleOptions}
                onChange={setConsole}
              />
            </div>
            <div className="form-group text-center">
              <label>Gênero: </label>
              <br />
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={genreOptions[0].label}
                name="genre"
                options={genreOptions}
                onChange={setGenre}
              />
            </div>
            <div className="form-group text-center">
              <label>URL da Imagem: </label>
              <br />
              <textarea
                rows="2"
                className="input"
                ref={pictureRef}
                type="text"
                placeholder="URL da Imagem"
              />
            </div>
          </form>

          <button
            className="btn btn-light header-button"
            style={{ margin: '0 auto' }}
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewGameModal;
