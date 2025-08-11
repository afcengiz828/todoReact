import React, { useEffect, useState } from 'react'
import TodoList from '../components/TodoList'
import TodoItem from '../components/TodoItem'
import TodoFilter from '../components/TodoFilter'
import Header from '../components/Header'
import { motion } from "framer-motion";
import { useSelector } from 'react-redux'


export const TodoListPage = () => {

  const selector = useSelector(state => state.dark);

  useEffect(() => {
    if (selector.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selector.dark]);


  const pageTransition = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen dark:h-screen">

      <motion.div variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >

        <Header />
        <div>
          <div className='w-full flex justify-center'>

            <section className='text-center flex justify-center'>
              <TodoFilter />
            </section>
          </div>

          <section  >
            <TodoList />
          </section>

        </div>

      </motion.div>
    </div>
  )
}


