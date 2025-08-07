import React, { useEffect, useState } from 'react'
import TodoForm from '../components/TodoForm'
import Header from '../components/Header'
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';


const TodoDetail = () => {

  const pageTransition = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const selector = useSelector(state => state.dark);


  useEffect(() => {
    if (selector.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selector.dark]);


  return (
    <div className='bg-gray-50 dark:bg-gray-900'>

      <motion.div variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }} class=" h-screen flex flex-col justify-start ">

        <Header  />

        <section>
          <TodoForm />
        </section>

      </motion.div>
    </div>
  )
}

export default TodoDetail