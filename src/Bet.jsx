import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ amount: e.target.value });
  }

  render() {
    const { games, selected, addBet } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          {games[selected].teams.map((team, i) => (
            <div className="col s6" key={team.name}>
              <div className="card-panel hoverable">
                <h2 className="center-align purple-text accent-4 ">
                  {team.name}
                </h2>
                <div className="row">
                  <div className="col s12">
                    <div className="input-field s12">
                      <i className="material-icons prefix" />
                      <input
                        placeholder="Enter Bid Amount"
                        type="number"
                        onChange={this.onChange}
                      />
                    </div>
                    <div>
                      <h5 className="blue-gray-text">Bets : {team.bets}</h5>
                      <h5 className="blue-gray-text right">
                        Betted Amount :{team.amount}&#36;
                      </h5>
                    </div>
                    <a
                      className="waves-effect waves-light purple accent-4 btn  right"
                      onClick={e => {
                        addBet(i, this.state.amount);
                      }}
                    >
                      Bet On {team.name}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Bet.propTypes = {
  games: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  addBet: PropTypes.func.isRequired
};

export default Bet;
