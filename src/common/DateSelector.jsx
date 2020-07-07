import React, {  } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { h0 } from '../common/fp'
import Header from './Header.jsx'

import './DateSelector.css'

function Day(props) {
  const {
    day,
    onSelect
  } = props
  if (!day) {
    return <td className="null"></td>
  }
  const classes = []
  const now = h0()
  if (day < now) {
    classes.push('disabled')
  }
  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push('weekend')
  }
  const dateString = now === day ? '今天' : new Date(day).getDate()
  return (
  <td className={classnames(classes)} onClick={() => onSelect(day)}>{dateString}</td>
  )
}

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
}

function Week (props) {
  const {
    days,
    onSelect
  } = props
  return (
    <tr className="date-table-days">
      {
        days.map((day, index) => {
          return (
            <Day key={index} day={day} onSelect={onSelect}></Day>
          )
        })
      }
    </tr>
  )
}

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

function Month(props) {
  const {
    startTimeInMonth,
    onSelect
  } = props
  const startDay = new Date(startTimeInMonth)
  const currentDay = new Date(startTimeInMonth)
  let days = []

  while(currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime())
    currentDay.setDate(currentDay.getDate() + 1)
  }
  // 日历不一定是从星期一开始，需要补齐前面的，如果非周日，补齐星期几减去1，如果是周日补上6
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null).concat(days)

  // 日历结尾补齐，如果是非周日，补上7减去星期几，如果是周日不用补
  const lastDay = new Date(days[days.length - 1])
  days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null))

  const weeks = []
  for (let row = 0; row < days.length; row++) {
    const week = days.slice(row * 7, (row + 1) * 7)
    weeks.push(week)
  }

  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>{startDay.getFullYear()}年{startDay.getMonth() + 1}月</h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="data-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {
          weeks.map((week, index) => {
            return (
              <Week 
                key={index}
                days={week}
                onSelect={onSelect}></Week>
            )
          })
        }
      </tbody>
    </table>
  )
}

Month.protoTypes = {
  startTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default function DateSelector (props) {
  const {
    show,
    onSelect,
    onBack
  } = props

  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  now.setDate(1)

  const monthSequence = [now.getTime()] // 当前月1号00:00:00

  now.setMonth(now.getMonth() + 1)
  monthSequence.push(now.getTime()) // 下个月1号00:00:00

  now.setMonth(now.getMonth() + 1)
  monthSequence.push(now.getTime()) // 下下个月1号00:00:00

  return (
    <div className={classnames('date-selector', {hidden: !show})}>
      <Header title="日期选择" onBack={onBack} ></Header>
      <div className="date-selector-tables">
        {
          monthSequence.map(month => {
            return (
              <Month
                key={month}
                onSelect={onSelect}
                startTimeInMonth={month}></Month>
              )
          })
        }
      </div>
    </div>
  )
}

DateSelector.protoTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}