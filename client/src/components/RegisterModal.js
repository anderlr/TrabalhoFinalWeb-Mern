import React, { useRef, useState } from 'react';
import '../pagestyle.css';
import Modal from 'react-bootstrap/Modal';
import { saveUser } from '../utils/API';

function RegisterModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(`Creating user: ${user}`);
    saveUser(user)
      .then((res) => {
        console.log(res);
        props.handleGetSavedGames();
        alert('Usuário registrado! Faça log-in para continuar.');
      })
      .catch((err) => alert('User already exists for given email.'));
    handleClose();
  }

  return (
    <>
      <button
        className="btn header-button"
        style={{ backgroundColor: '#ff6363', color: 'white' }}
        onClick={handleShow}
      >
        SignUp
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{ backgroundColor: '#4C4E49', color: 'white' }}
          closeButton
        >
          <Modal.Title
            style={{ fontFamily: "'Roboto Slab', serif", fontSize: '30px' }}
          >
            Register
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
              <label>Name: </label>
              <br />
              <input
                className="input"
                ref={nameRef}
                name="name"
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div className="form-group text-center">
              <label>Email: </label>
              <br />
              <input
                className="input"
                ref={emailRef}
                name="email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="form-group text-center">
              <label>Password: </label>
              <br />
              <input
                className="input"
                ref={passwordRef}
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
          </form>

          <button
            className="btn header-button"
            style={{
              margin: '0 auto',
              backgroundColor: '#ff6363',
              color: 'white',
            }}
            onClick={handleSubmit}
          >
            SignUp
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterModal;
