import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import TodoDetail from './pages/TodoDetail'
import {TodoListPage} from './pages/TodoListPage'

const AppRouter = () => {
    


    return (
    <>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path= "/tododetail/:idTodo?"element={<TodoDetail/>}/>
            <Route path='/todolist' element={<TodoListPage/>}/>
        </Routes>
    </>
  )
}

export default AppRouter