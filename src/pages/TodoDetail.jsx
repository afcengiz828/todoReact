import React from 'react'
import TodoForm from '../components/TodoForm'
import Header from '../components/Header'

const TodoDetail = ({ idTodo }) => {
  return (
    <div class="flex flex-col justify-start ">

      <Header />

      <section>
        <TodoForm/>
      </section>

    </div>
  )
}

export default TodoDetail