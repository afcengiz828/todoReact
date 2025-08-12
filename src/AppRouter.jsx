import React from 'react'
import { Route, Router, Routes, useLocation } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import TodoDetail from './pages/TodoDetail'
import { TodoListPage } from './pages/TodoListPage'
import TodoItem from './components/TodoItem'
import { AnimatePresence } from 'framer-motion'
import Categories from './pages/Categories'

const AppRouter = () => {

    const location = useLocation();

    return (
        <>
            <AnimatePresence mode="wait">

                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path="/tododetail/:idTodo?" element={<TodoDetail />} />
                    <Route path='/todolist' element={<TodoListPage />} />
                    <Route path='/todoitem/:c' element={<TodoItem />} />
                </Routes>
            </AnimatePresence>
        </>
    )
}

export default AppRouter