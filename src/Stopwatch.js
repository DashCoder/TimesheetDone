import React, {useState} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

 
class Stopwatch extends React.Component {

  runningTime = 0;

  constructor(props) {
    super(props);
    this.state = {secondsElapsed: 1};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    this.setState({
      secondsElapsed: (this.state.secondsElapsed + 1),
      date: new Date()
    });
  }

  getMs = () => {
    return ('0' +this.state.secondsElapsed * 100).slice(-2);
  };

  getSec = () => {
     return ('0' + parseInt(this.state.secondsElapsed % 60)).slice(-2);
  };

  getMin = () => {
    return ('0' + Math.floor(this.state.secondsElapsed / 60)).slice(-2);
  };

  startTimer = () => {

    this.tick = () => {    this.setState({
      secondsElapsed: (this.state.secondsElapsed + 1),
      date: new Date()
    });};

  };

  resetTimer = () => {

    this.setState({
     secondsElapsed: 0
    })

    this.tick = () => {    this.setState({
      secondsElapsed: (this.state.secondsElapsed + 1),
      date: new Date()
    });};
 
  };

  pauseTimer = () => {
    this.tick = () => {return;};
  };

  render() {
    return (
      <div className="stopWatch">
        <h1>{this.getMin()}:{this.getSec()}:{this.getMs()}</h1>

        <button type="button" className="btn btn-warning" onClick={this.resetTimer}>Reset</button>
        <button type="button" className="btn btn-danger" onClick={this.pauseTimer}>Pause</button>
        <button type="button" className="btn btn-success" onClick={this.startTimer}>Start</button>

      </div>
    )
  }
};


Stopwatch.propTypes = {
  change: PropTypes.func.isRequired
};

export default Stopwatch;
