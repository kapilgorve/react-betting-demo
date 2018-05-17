import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team1: '',
      team2: ''
    };
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
  }

  componentDidMount() {
    window.$('.modal').modal();
  }
  open() {
    window.$('.modal').modal('open');
  }
  close() {
    window.$('.modal').modal('close');
  }
  componentWillUnmount() {
    window.$('.modal').modal('destroy');
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  add() {
    const { team1, team2 } = this.state;
    if (team1 && team2) {
      let newGame = {
        name: `${this.state.team1} vs ${this.state.team2}`,
        totalBets: 0,
        teams: [
          {
            name: this.state.team1,
            bets: 0,
            amount: 0
          },
          {
            name: this.state.team2,
            bets: 0,
            amount: 0
          }
        ]
      };
      this.close();
      this.props.addGame(newGame);
      this.setState({ team1: '', team2: '' });
    } else {
      window.Materialize.toast('Add both team names.', 2000);
    }
  }

  render() {
    return (
      <Fragment>
        <a
          className="btn-floating btn-large waves-effect waves-light pink accent-3 right"
          onClick={this.open}
        >
          <i className="material-icons">add</i>
        </a>
        <div id="modal" ref="modal" className="modal">
          <div className="modal-content">
            <h4>Add Game </h4>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input name="team1" type="text" onChange={this.onChange} />
                    <label htmlFor="team2">Team 1</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input name="team2" type="text" onChange={this.onChange} />
                    <label htmlFor="team2">Team 2</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <a className="waves-effect waves-light btn" onClick={this.add}>
              ADD GAME
            </a>
            <a className="modal-close waves-effect waves-green btn-flat">
              Close
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

AddGame.propTypes = {
  addGame: PropTypes.func.isRequired
};
export default AddGame;
