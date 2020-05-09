import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import {
  createSet,
  createAdd,
  createRemove,
  createToggle
} from './actions'
import reducer from './reducers'
import './App.css';

let idSeq = Date.now()

function bindActionCreators(actionCreators, dispatch) {
  const ret = {}
  for (const key in actionCreators) {
    if (actionCreators.hasOwnProperty(key)) {
      ret[key] = function(...args) {
        console.log('args', args)
        const actionCreator = actionCreators[key]
        console.log('actionCreator', actionCreator)
        const action = actionCreator(...args)
        console.log('aciton', action)
        dispatch(action)
      }
    }
  }
  return ret
}

const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()

    const newText = inputRef.current.value.trim()
    if (newText.length === 0) {
      return
    }

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })

    inputRef.current.value = ''
  }

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} className="new-todo" placeholder="what needs to be done?"/>
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, removeTodo, toggleTodo } = props
  const onChange = () => {
    toggleTodo(id)
  }
  const onRemove = () => {
    removeTodo(id)
  }
  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, toggleTodo ,removeTodo } = props
  return (
    <ul className="todos">
      {
        todos.map(todo => {
          return <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo}></TodoItem>
        })
      }
    </ul>
  )
})

const LS_KEY = '_$_todos'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [incrementCount, setIncrementCount] = useState(0)

  // const addTodo = useCallback((todo) => {
  //   setTodos(todos => [...todos, todo])
  // }, [])

  // const removeTodo = useCallback((id) => {
  //   setTodos(todos => todos.filter(todo => {
  //     return todo.id !== id
  //   }))
  // }, [])

  // const toggleTodo = useCallback((id) => {
  //   setTodos(todos => todos.map(todo => {
  //     return todo.id === id
  //       ? {
  //         ...todo,
  //         complete: !todo.complete
  //       }
  //       : todo
  //   }))
  // }, [])

  const dispatch = useCallback((action) => {
    console.log('aciton', action)
    const state = {
      todos,
      incrementCount
    }

    const setter = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }

    const newState = reducer(state, action)
    console.log('newState', newState)

    for (const key in newState) {
      setter[key](newState[key])
    }
  }, [todos, incrementCount])

  useEffect(() => {
    console.log('useEffect get')
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    dispatch(createSet(todos))
  }, [])

  useEffect(() => {
    console.log('useEffect set')
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className="todo-list">
      <Control
        {
          ...bindActionCreators({
            addTodo: createAdd
          }, dispatch)
        }
      ></Control>
      <Todos {
        ...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle
        }, dispatch)
      } todos={todos}></Todos>
    </div>
  )
}

export default TodoList;
