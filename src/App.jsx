import React, { Component, useState, useMemo, memo, useCallback } from 'react';
import './App.css';

const Counter = memo(function (props) {
  console.log('Counter render')
  return (
    <h1 onClick={props.onClick}>{props.count}</h1>
  )
})

function App(props) {
  console.log('app render')
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  // useMemo(() => fn) 和 useCallback 等价
  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log('onclick')
  //   }
  // }, [])

  // const onClick = useCallback(() => {
  //   console.log('onclick')
  // }, [])

  // const onClick = useCallback(() => {
  //   console.log('onclick')
  //   setClickCount(clickCount + 1)
  // }, [clickCount])

  // 这两个等价
  const onClick = useCallback(() => {
    console.log('onclick')
    setClickCount(clickCount => clickCount + 1)
  }, [])

  return (
    <div>
      <button
        onClick={() => { setCount(count + 1) }}  
      >
        click ({count}), double is {double}
      </button>
      <Counter count={double} onClick={onClick}></Counter>
    </div>
  )
}

export default App;
