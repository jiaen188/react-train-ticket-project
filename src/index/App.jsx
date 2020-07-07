import React, {
  useCallback,
  useMemo
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './App.css'

import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector'

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate
} from './actions'
import { h0 } from '../common/fp'

function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    isDateSelectorVisible,
    cityData,
    isLoadingCityData,
    dispatch,
    departDate
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo())
  // }, [])

  // const doShowCitySelector = useCallback((m) => {
  //   dispatch(showCitySelector(m))
  // }, [])

  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, [])

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideCitySelector,
      fetchCityData,
      onSelect: setSelectedCity
    }, dispatch)
  })

  const departDateCbs = useMemo(() => {
    return bindActionCreators({
      onClick: showDateSelector
    }, dispatch)
  }, [])

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideDateSelector,
    }, dispatch)
  }, [])

  const onSelectDate = useCallback((day) => {
    if (!day) {
      return
    } 
    if (day < h0()) {
      return
    }
    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}></Header>
      </div>
      <form className="form">
        {/* <Journey
          from={from}
          to={to}
          exchangeFromTo={doExchangeFromTo}
          showCitySelector={doShowCitySelector}
        ></Journey> */}
        <Journey
          from={from}
          to={to}
          { ...cbs }
        ></Journey>
        <DepartDate
          time={departDate}
          {...departDateCbs}></DepartDate>
        <HighSpeed></HighSpeed>
        <Submit></Submit>
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        { ...citySelectorCbs }></CitySelector>
      <DateSelector 
        show={isDateSelectorVisible}
        {...dateSelectorCbs}
        onSelect={onSelectDate}></DateSelector>
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