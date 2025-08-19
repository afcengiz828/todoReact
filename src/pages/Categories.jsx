import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Hash } from 'lucide-react'
import Header from '../components/Header'
import CategoryForm from '../components/CategoryForm'
import CategoryList from '../components/CategoryList'

const Categories = () => {
  const selector = useSelector(state => state.dark);

  const pageTransition = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  }

 

  useEffect(() => {
    if (selector.dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [selector.dark])

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"
    >
      {/* Header */}
        <Header />
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20`}>
      <motion.div 
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        
        <div className={` container mx-auto px-4 py-8 max-w-6xl`}>
          {/* Page Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg">
              <Hash className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Kategoriler
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Todo kategorilerinizi yönetin
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <CategoryForm />
            </div>

            {/* Categories List */}
            <CategoryList />
          </div>
        </div>
      </motion.div>
    </div>
      </motion.div>

  )
}

export default Categories