import React from 'react'
import TodoList from '../components/TodoList'
import TodoItem from '../components/TodoItem'
import TodoFilter from '../components/TodoFilter'

export const TodoListPage = () => {
  return (
    <div>
      
      <TodoFilter/>
      <TodoList/>
        
    </div>
  )
}


