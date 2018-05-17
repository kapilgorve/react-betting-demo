import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddGame from './AddGame';

class LeftBar extends Component {
  render() {
    const {
      addGame,
      games,
      selected,
      searchText,
      selectTeam,
      setSearch,
      remove
    } = this.props;
    return (
      <div className="col s3 card-panel pb-1">
        <div className="row">
          <div className="col s12 ">
            Filter Game:
            <div className="input-field inline">
              <input id="game" type="text" onChange={setSearch} />
            </div>
          </div>
        </div>
        <ul>
          {games
            .filter(game =>
              game.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((game, i) => (
              <li
                key={game.name}
                className="card-panel  purple accent-4 white-text z-depth-1"
              >
                <a onClick={e => selectTeam(i)}>{game.name}</a>
                <a
                  className="waves-effect waves-light right"
                  onClick={e => remove(i)}
                >
                  <i className="material-icons">delete</i>
                </a>
              </li>
            ))}
        </ul>
        <AddGame addGame={addGame} />
      </div>
    );
  }
}

LeftBar.propTypes = {
  addGame: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  searchText: PropTypes.string.isRequired,
  selectTeam: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

export default LeftBar;
