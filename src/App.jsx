import React, { Component, PureComponent, memo } from 'react';
// import logo from './logo.svg';
import './App.css';

const Foo = memo(function Foo(props) {
  console.log('Foo render')
  return (
    <div>age:{props.person.age}</div>
  )
})

// class Foo extends PureComponent {
//   render() {
//     console.log('Foo render')
//     return (
//       <div>age:{this.props.person.age}</div>
//     )
//   }
// }

// class Foo extends Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.name === this.props.name) {
//       return false
//     }
//     return true
//   }
//   render() {
//     console.log('Foo render')
//     return (
//       <div>foo</div>
//     )
//   }
// }

class App extends Component {
  state = {
    count: 0,
    person: {
      age: 1
    },
  }
  callback = () => {}
  render () {
    console.log('app render')
    let { person, count } = this.state
    return (
      <div>
        <button onClick={ () => {
          person.age++
          count++
          this.setState({
            count
          })
        } }>add</button>
        <Foo person={person} cb={this.callback}></Foo>
      </div>
    )
  }
}

export default App;
