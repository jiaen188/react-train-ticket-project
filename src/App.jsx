import React, { Component, useState, useEffect, useRef, PureComponent, useCallback } from 'react';
import './App.css';

// class Counter extends PureComponent {
//   render() {
//     const { props } = this
//     return (
//       <h1>{props.count}</h1>
//     )
//   }
// }

function useCounter (count) {
  const size = useSize()
  return (
    <h1>{count}, {size.width} X {size.height}</h1>
  )
}

function useCount (defaultCount) {
  const [count, setCount] = useState(defaultCount)
  const it = useRef()

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  })

  return [count, setCount]
}

function useSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const onResize = useCallback(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [onResize])

  return size
}

function App(props) {
  console.log('app render')
  const [count, setCount] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()

  return (
    <div>
      <button
        onClick={() => { setCount(count + 1) }}  
      >
        click ({count}), {size.width} X {size.height}
      </button>
      {/* <Counter count={count}></Counter> */}
      {Counter}
    </div>
  )
}

export default App;
