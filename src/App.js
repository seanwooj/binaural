import React, { Component } from 'react';
import './App.css';
import BinauralTone from './BinauralTone'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const ToolTipSlider = createSliderWithTooltip(Slider);

class App extends Component {
  state = {
    baseHz:220,
    beatHz: 12
  }

  componentDidMount() {
    this.bTone = new BinauralTone({baseHz: this.state.baseHz, beatHz: this.state.beatHz});
  }

  startTone = () => {
    this.bTone.start();
  }

  endTone = () => {
    this.bTone.stop();
  }

  updateBeatHz = (hz) => {
    this.setState({
      beatHz: hz
    });
    this.bTone.updateBeatHz(hz);
  }

  render() {
    return (
      <div className='container'>
        <ToolTipSlider min={0.1} max={40} step={0.1} value={this.state.beatHz} onChange={this.updateBeatHz}/>
        <button onClick={this.startTone}>Start</button>
        <button onClick={this.endTone}>Stop</button>
      </div>
    );
  }
}

export default App;
