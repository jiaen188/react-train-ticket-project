import React, { Component, useState, useMemo, useEffect, memo, useCallback, useRef, PureComponent } from 'react';
import './App.css';

class Counter extends PureComponent {
  speak() {
    console.log(`now counter is : ${this.props.count}`)
  }

  render() {
    const { props } = this
    return (
      <h1 onClick={props.onClick}>{props.count}</h1>
    )
  }
}

function App(props) {
  console.log('app render')
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const counterRef = useRef()
  const it = useRef()

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

    counterRef.current.speak()
  }, [counterRef])

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

  return (
    <div>
      <button
        onClick={() => { setCount(count + 1) }}  
      >
        click ({count}), double is {double}
      </button>
      <Counter ref={counterRef} count={double} onClick={onClick}></Counter>
    </div>
  )
}

export default App;
