import React, { Component } from 'react';
import LeftBar from './LeftBar';
import Bet from './Bet';
import Stat from './Stat';
import dataFile from './data';

const storage = window.localStorage;

class App extends Component {
  constructor() {
    super();
    let localGames = storage.getItem('games');
    let data;
    if (localGames) {
      data = JSON.parse(localGames);
    } else data = dataFile;
    this.state = {
      games: data,
      selected: 0,
      searchText: ''
    };
    this.addBet = this.addBet.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.addGame = this.addGame.bind(this);
    this.saveLocal = this.saveLocal.bind(this);
    this.removeGame = this.removeGame.bind(this);
  }

  addBet(teamIndex, amount = 10) {
    const { games, selected } = this.state;
    let changedGame = games[selected];
    changedGame.teams[teamIndex].bets++;
    changedGame.teams[teamIndex].amount =
      changedGame.teams[teamIndex].amount + parseInt(amount);
    changedGame.totalBets++;
    this.setState(
      {
        games: [
          ...games.slice(0, selected),
          changedGame,
          ...games.slice(selected + 1)
        ]
      },
      this.saveLocal
    );
  }

  selectTeam(selected) {
    this.setState({ selected });
  }

  setSearch(e) {
    this.setState({ searchText: e.target.value });
  }

  addGame(game) {
    this.setState({ games: [...this.state.games, game] }, this.saveLocal);
  }

  removeGame(index) {
    const { games } = this.state;
    this.setState(
      {
        games: [...games.slice(0, index), ...games.slice(index + 1)]
      },
      this.saveLocal
    );
  }

  saveLocal() {
    storage.setItem('games', JSON.stringify(this.state.games));
  }

  render() {
    const { games, selected } = this.state;
    return (
      <div className="main">
        <div className="container-fluid">
          <div className="row">
            <LeftBar
              {...this.state}
              selectTeam={this.selectTeam}
              setSearch={this.setSearch}
              addGame={this.addGame}
              remove={this.removeGame}
            />
            <div className="col s9">
              <Stat selected={selected} games={games} />
              <Bet selected={selected} games={games} addBet={this.addBet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
