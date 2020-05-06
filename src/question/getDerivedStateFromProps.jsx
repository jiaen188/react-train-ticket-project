import { Component, useState } from "react";

class Counter extends Component {
  state = {
    overflow: false
  }
  static getDereivedStateFromProps(props, state) {
    if (props.count > 10) {
      return {
        overflow: true
      }
    }
  }
}

function Counter (props) {
  const [overflow, setOverflow] = useState(false)
  if (props.count > 10) {
    setOverflow(true)
  }
}
