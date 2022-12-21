import React from "react";
import "../pagestyle.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function HeaderNotLogged(props) {

    return (
        <>
            <nav className="nav header-custom">
                <button className="btn header-button-add" style={{margin: "0 auto", marginLeft: "0", backgroundColor: "#ff6363", color: "white"}} onClick={() => alert("Faça log-in para cadastrar novos jogos.")}>
                    Adicionar Jogo ➕
                </button>
                <LoginModal 
                    handleGetSavedGames={props.handleGetSavedGames}
                />
                <RegisterModal 
                    handleGetSavedGames={props.handleGetSavedGames}
                />
            </nav>
        </>
    );
};



export default HeaderNotLogged;