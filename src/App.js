import React, { Component } from 'react';
import './App.css';
import BinauralTone from './BinauralTone'

class App extends Component {
  componentDidMount() {
    this.bTone = new BinauralTone({baseHz: 220, beatHz: 12});
  }

  startTone = () => {
    this.bTone.start();
  }

  endTone = () => {
    this.bTone.stop();
  }

  render() {
    return (
      <div className='container'>
        <button onClick={this.startTone}>Start</button>
        <button onClick={this.endTone}>Stop</button>
      </div>
    );
  }
}

export default App;
