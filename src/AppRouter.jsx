import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import TodoDetail from './pages/TodoDetail'
import TodoList from './pages/TodoList'

const AppRouter = () => {
    


    return (
    <>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/tododetail:id' element={<TodoDetail/>}/>
            <Route path='/todolist' element={<TodoList/>}/>
        </Routes>
        <div>AppRouter</div>
    </>
  )
}

export default AppRouter