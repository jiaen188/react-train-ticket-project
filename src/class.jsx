import React, { Component } from 'react';

class Foo extends Component {
  state = {
    size: [window.innerWidth, window.innerWidth]
  }

  onResize = () => {
    console.log('onResize')
    this.setState({
      size: [window.innerWidth, window.innerWidth]
    })
  }

  componentDidMount() {
    console.log('componentDidMount')
    window.addEventListener('resize', this.onResize)
    document.title = this.state.size.join('X')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
    document.title = this.state.size.join('X')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    console.log('foo render')
    const size = this.state.size
    return (
      <div>title: {size.join('X')}</div>
    )
  }
}

export default Foo