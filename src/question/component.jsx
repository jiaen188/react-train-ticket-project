import { useEffect, useRef } from "react";

function App () {
  useEffect(() => {
    // componentDidMount
    return () => {
      // componentWillUnmount
    }
  }, [])

  let renderCount = useRef(0)
  renderCount.current++

  useEffect(() => {
    if (renderCount > 1) {
      // componentDidUpdate
    }
  })
}