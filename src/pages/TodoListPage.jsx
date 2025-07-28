import React from 'react'
import TodoList from '../components/TodoList'
import TodoItem from '../components/TodoItem'

export const TodoListPage = () => {
  return (
    <div>
      <div>
        <center>
          <form action="">
            <input type="text" placeholder="Search.."></input>
            <button type="submit">Search</button>
          </form>
        </center>
      </div>

      <TodoList/>
        
    </div>
  )
}


