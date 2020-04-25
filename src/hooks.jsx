import React, { useState, useEffect } from "react";

function Foo() {
  const [ size, setSize ] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    console.log('useEffect set title')
    document.title = size.join('X')
  })

  const onResize = () => {
    console.log('onReize')
    setSize([window.innerWidth, window.innerHeight])
  }

  useEffect(() => {
    console.log('useEffect addevent')
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  console.log('render')

  return (
    <div>title: {size.join('X')}</div>
  )
}

export default Foo