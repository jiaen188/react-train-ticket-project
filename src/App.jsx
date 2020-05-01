import React, { Component, useState, useEffect } from 'react';
import './App.css';

class App2 extends Component {
  state = {
    count: 0,
    size: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  onResize = () => {
    this.setState({
      size: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })
  }

  componentDidMount() {
    document.title = this.state.count

    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  componentDidUpdate() {
    document.title = this.state.count
  }
  render() {
    const { count, size } = this.state
    return (
      <button
        onClick={() => { this.setState({ count: count + 1 }) }}  
      >
        click ({count})
        size: {size.width} X {size.height}
      </button>
    )
  }
}

function App(props) {
  console.log('app render')
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const onResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    console.log('count :', count)
  }, [count])

  useEffect(() => {
    document.title = count
  })

  useEffect(() => { // 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const onClick = () => {
    console.log('click')
  }

  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick, false)
    return () => {
      document.querySelector('#size').removeEventListener('click', onClick, false) 
    }
  })

  return (
    <div>
      <button
        onClick={() => { setCount(count + 1) }}  
      >
        click ({count})
      </button>
      {
        count % 2
        ? <span id="size">span size: {size.width} X {size.height}</span>
        : <p id="size">p size: {size.width} X {size.height}</p>
      }
    </div>
  )
}

export default App;
