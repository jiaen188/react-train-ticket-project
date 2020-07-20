import { connect } from 'react-redux'
import React from 'react'

import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

import './App.css'

function App(props) {
  return (
    <div>
      <Nav></Nav>
      <List></List>
      <Bottom></Bottom>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch }
  }
)(App)