import React from 'react'
import switchImg from './imgs/switch.svg'
import './Journey.css'

export default function Journey(props) {
  const {
    from,
    to,
    exchangeFromTo,
    showCitySelector
  } = props
  return (
    <div className="journey">
      <div
        className="journey-station"
        onClick={() => showCitySelector(true)}
      >
        <input
          readOnly
          name="from"
          value={from}
          type="text"
          className="journey-input journey-from" />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div
        className="journey-station"
        onClick={() => showCitySelector(false)}
      >
        <input
          readOnly
          name="to"
          value={to}
          type="text"
          className="journey-input journey-to" />
      </div>
    </div>
  )
}
