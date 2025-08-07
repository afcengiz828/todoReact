import React from 'react'
import TodoList from '../components/TodoList'
import TodoItem from '../components/TodoItem'
import TodoFilter from '../components/TodoFilter'
import Header from '../components/Header'

export const TodoListPage = () => {


  return (
    <div  className="bg-gray-50 h-screen" >
      <Header />
      <div>

        <section className='text-center flex justify-center'>
          <TodoFilter />
        </section>

        <section  >
          <TodoList />
        </section>

      </div>

    </div>
  )
}


