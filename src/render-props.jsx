import React from 'react'

// 渲染属性
class Resizeable extends React.Component {
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
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    return this.props.render(this.props.size)
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

// eslint-disable-next-line no-unused-expressions
<Resizeable render={size => <Foo size={size} />} />
