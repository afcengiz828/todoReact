import React, { useEffect, useState } from 'react'
import SpecialStats from '../components/Dashboard/SpecialStats'
import IncomingTodos from '../components/Dashboard/IncomingTodos'
import Header from '../components/Header'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {

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
    <>

      <div className='h-screen bg-gray-50 text-gray-500 dark:bg-gray-900  dark:text-gray-100'>

        <motion.div variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }} >

          <Header />

          <section class=" py-6">
            <div className="mx-auto overflow-x-auto rounded-lg shadow-md max-w-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead >
                  <tr>
                    <th scope="col" className=" px-6 py-3 text-center text-lg font-semibold  uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-center text-lg font-semibold  uppercase tracking-wider">Todo Count</th>
                  </tr>
                </thead>
                <SpecialStats />
              </table>
            </div>
          </section>

          <section className=" py-6">
              <IncomingTodos />
          </section>


        </motion.div>
      </div>


    </>



  )
}

export default Dashboard