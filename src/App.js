import React, { createContext, Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const BatteryContext = createContext()
const OnlineContext = createContext()

function Leaf() {
  return (
    <BatteryContext.Consumer>
      {
        battery => (
          <OnlineContext.Consumer>
            {
              online => <h1>Battery: {battery}, Online: {String(online)}</h1>
            }
          </OnlineContext.Consumer>
        )
      }
    </BatteryContext.Consumer>
  )
}

function Middle() {
  return (
    <Leaf></Leaf>
  )
}

class App extends Component {
  state = {
    battery: 60,
    online: true
  }
  render() {
    const { battery, online } = this.state
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={ () => this.setState({ battery: battery - 1 }) }
          >press</button>
          <button
            type="button"
            onClick={ () => this.setState({ online: !online }) }
          >switch</button>
          <Middle></Middle>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }
}

export default App;
