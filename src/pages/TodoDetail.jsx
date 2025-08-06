import React from 'react'
import TodoForm from '../components/TodoForm'
import Header from '../components/Header'

const TodoDetail = () => {
  return (
    <div class="bg-gray-50 h-screen flex flex-col justify-start ">

      <Header />

      <section>
        <TodoForm/>
      </section>

    </div>
  )
}

export default TodoDetail