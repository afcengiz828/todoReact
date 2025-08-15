import React, { useEffect } from 'react'
import CategoryForm from '../components/CategoryForm'
import Header from '../components/Header'
import CategoryList from '../components/CategoryList'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion";

const Categories = () => {

  const selector = useSelector(state => state.dark);

  const pageTransition = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  useEffect(() => {
    if (selector.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selector.dark]);

  return (
    <div className='bg-gray-50 dark:bg-gray-900 h-full'>
      <motion.div variants={pageTransition} 
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}>

      <center>

        <Header />

        {/* Kategori ekleme formu */}
        <CategoryForm />

        {/* Kategori Listesi */}
        <CategoryList />
        
        
      </center>
      </motion.div>
    </div>

  )
}

export default Categories