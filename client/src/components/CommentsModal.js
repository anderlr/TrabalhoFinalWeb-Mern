import React, { useRef, useState } from 'react'
import "../pagestyle.css";
import Modal from 'react-bootstrap/Modal';
import { updateGame} from "../utils/API";

function CommentsModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const commentRef = useRef();
    const ratingRef = useRef();

    function handleupdateGame(gameId, gameData) {
        updateGame(gameId, gameData)
          .then(props.handleGetSavedGames())
          .catch(err => console.log(err));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newComment = {
            comments: commentRef.current.value
        };

        const newRating = {
            rating: ratingRef.current.value
        };

        handleupdateGame(props.gameId, newComment);
        handleupdateGame(props.gameId, newRating);

        localStorage.setItem(`${props.title}`, "reviewed");
        
        handleClose();
    }

    return (
        <>
            <button variant="primary" className="btn btn-info comment-button" onClick={handleShow}>
                Reviews
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#39AEC5", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"}}>

                    <div className="comment-container">
                    {!props.comments.length ? (
                            <p style={{margin: "10%", textDecoration: "underline", fontSize: "20px"}}>Este jogo não possui reviews ainda.
                            </p>
                        ) : (
                            props.comments.map(comment => {
                                return(         
                                    <p>- '{comment}'</p>
                                );
                            })
                        )}
                    </div>
                    <div className="review-container">
                        <form>
                            <div className="form-group text-center">
                                <textarea
                                    rows="2"
                                    className="input-comment"
                                    ref={commentRef}
                                    type="text"
                                    placeholder="Novo review"
                                />
                            </div>
                        </form>

                        <select name="rating" ref={ratingRef}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <button className="btn btn-light header-button" style={{margin: "0 auto"}} onClick={handleSubmit}>
                        Adicionar Review
                    </button>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default CommentsModal;