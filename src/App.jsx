import React, { Component, useState } from 'react';
import './App.css';

class App2 extends Component {
  state = {
    count: 0
  }
  render() {
    const { count } = this.state
    return (
      <button
        onClick={() => { this.setState({ count: count + 1 }) }}  
      >
        click ({count})
      </button>
    )
  }
}

function App(props) {
  console.log('app render')
  const [count, setCount] = useState(() => {
    console.log('initial count')
    return props.defaultCount || 0
  })
  return (
    <button
      onClick={() => { setCount(count + 1) }}  
    >
      click ({count})
    </button>
  )
}

export default App;
