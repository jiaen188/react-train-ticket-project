import React, { Component } from 'react';

function resizeable(Child) {
  return class Wrapper extends Component {
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
      const size = this.props.size
      return (
        <Child size={size}></Child>
      )
    }
  }
}

class Foo extends React.Component {
  render() {
    const [width, height] = this.props.size
    return (
    <div>{width} X {height}</div>
    )
  }
}
const WrapperedFoo = resizeable(Foo)

<WrapperedFoo />
