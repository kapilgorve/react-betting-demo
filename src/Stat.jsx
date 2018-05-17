import React, { Component } from 'react';
var BarChart = require('react-chartjs').Bar;
import PropTypes from 'prop-types';

class Stat extends Component {
  constructor() {
    super();
    this.chartOptions = {
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)'
    };
  }
  render() {
    let { games, selected } = this.props;
    let width = window.innerWidth - window.innerWidth * 0.3;
    let chartData = {
      labels: ['Number Of Bets'],
      datasets: [
        {
          data: [games[selected].teams[0].bets],
          ...this.chartOptions
        },
        {
          ...this.chartOptions,
          data: [games[selected].teams[1].bets]
        }
      ]
    };
    return (
      <div>
        <BarChart
          data={chartData}
          options={this.chartOptions}
          width={width}
          height="300"
        />
      </div>
    );
  }
}

Stat.propTypes = {
  games: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired
};

export default Stat;
