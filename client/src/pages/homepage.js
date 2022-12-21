import React, { Component } from 'react';
import Select from 'react-select';
import Header from '../components/Header';
import GamePrint from '../components/GamePrint';
import { getSavedGames } from '../utils/API';
import '../pagestyle.css';
import { getJWT, getUser } from '../helpers/jwt';

class Homepage extends Component {
  state = {
    search: '',
    gameList: [],
    firstGameList: [],
    user: '',
    console: 'inicial',
  };

  componentDidMount() {
    this.handleGetSavedGames();

    const jwt = getJWT();
    if (!jwt) {
      this.props.history.push('/notlogged');
    }

    const jwtUser = getUser();
    if (jwtUser) {
      this.setState({ user: jwtUser });
    }
  }

  handleInputChange = (event) => {
    let searchTerm = event.target.value;
    this.setState({ search: searchTerm });
  };

  handleConsoleChange = (event) => {
    this.state.gameList = this.state.firstGameList;

    let newGameList = [];
    this.setState({ console: event.value }, () => {
      //filtrando por console
      if (this.state.gameList.length > 0 && this.state.console)
        newGameList = this.state.gameList.filter((Game) => {
          return Game.console == this.state.console;
        });
      this.setState({ gameList: newGameList });
    });
  };

  handleGetSavedGames = () => {
    getSavedGames()
      .then((res) => {
        this.setState({ gameList: res.data });
        this.setState({ firstGameList: res.data });
        if (this.state.console == 'inicial') this.setState({ gameList: [] });
      })
      .catch((err) => console.log(err));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.handleGetSavedGames();
    this.setState({
      searchTerm: '',
    });
  };

  render() {
    let consoleOptions = [
      { value: 'xbox', label: 'XBOX' },
      { value: 'playStation', label: 'PlayStation' },
      { value: 'switch', label: 'Switch' },
      { value: 'pc', label: 'PC' },
    ];

    let controlStyles = {
      color: 'black',
    };

    let filteredGames = this.state.gameList.filter((Game) => {
      return (
        Game.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    filteredGames.sort((a, b) => {
      let ratingA = a.rating.length > 0 ? avgRating(a.rating) : 0;
      let ratingB = b.rating.length > 0 ? avgRating(b.rating) : 0;

      return ratingB - ratingA;

      function avgRating(rating) {
        let totalRating = 0;
        for (let number of rating) {
          totalRating += +number;
        }
        let averageRating = (totalRating / rating.length).toFixed(2);
        return averageRating;
      }
    });

    if (!this.state.search) {
      filteredGames = filteredGames.splice(0, 3);
    }

    return (
      <>
        <Header handleGetSavedGames={this.handleGetSavedGames} />
        <div className="top-flex-container">
          <h1>Olá, {this.state.user}</h1>
          <form className="form">
            <input
              value={this.state.search}
              onChange={this.handleInputChange}
              type="text"
              placeholder="Procurar Jogo"
            />
            <br />
            <div style={controlStyles}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={consoleOptions[0].value}
                name="console"
                options={consoleOptions}
                onChange={this.handleConsoleChange}
              />
            </div>
          </form>
        </div>
        {!this.state.gameList.length ? (
          <div className="row">
            <div className="col-sm-12">
              {this.state.console == 'inicial' ? (
                <h1 className="text-center intro-text">
                  Selecione uma plataforma para começar!
                </h1>
              ) : (
                <h1 className="text-center intro-text">
                  Não existem jogos cadastrados no momento.
                </h1>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-container">
            {filteredGames.map((Game) => {
              return (
                <>
                  <GamePrint
                    key={Game._id}
                    gameId={Game._id}
                    background={Game.picture}
                    title={Game.title}
                    desc={Game.description}
                    rating={Game.rating}
                    comments={Game.comments}
                    developer={Game.developer}
                    resume={Game.resume}
                    genre={Game.genre}
                    handleGetSavedGames={this.handleGetSavedGames}
                  />
                </>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

export default Homepage;
