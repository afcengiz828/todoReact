import React, { useEffect, useState } from 'react'
import SpecialStats from '../components/Dashboard/SpecialStats'
import IncomingTodos from '../components/Dashboard/IncomingTodos'
import Header from '../components/Header'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, TrendingUp, CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react'

const Dashboard = () => {

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const selector = useSelector(state => state.dark);
  const allTodos = useSelector(state => state.all);

  useEffect(() => {
    if (selector.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selector.dark]);

  // Hızlı istatistikler için
  const getTotalTodos = () => allTodos.allTodos?.length || 0;
  const getCompletedTodos = () => allTodos.allTodos?.filter(todo => todo.status === 'completed').length || 0;
  const getProgressPercentage = () => {
    const total = getTotalTodos();
    const completed = getCompletedTodos();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100'>
      
      <motion.div 
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Header />
        
        {/* Hero Section */}
        <section className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <motion.h1 
                className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Dashboard 📊
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Todo'larınızın genel durumu ve yaklaşan görevleriniz
              </motion.p>
            </div>

            {/* Quick Stats Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Toplam Todo</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{getTotalTodos()}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tamamlanan</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{getCompletedTodos()}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">İlerleme</p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{getProgressPercentage()}%</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktif Todo</p>
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {getTotalTodos() - getCompletedTodos()}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Status Statistics */}
        <section className="px-6 py-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <TrendingUp className="h-6 w-6" />
                  Status İstatistikleri
                </h2>
                <p className="text-indigo-100 mt-2">Todo'larınızın mevcut durumu</p>
              </div>
              
              <div className="p-0">
                <SpecialStats />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Incoming Todos */}
        <section className="px-6 py-8 pb-12">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Calendar className="h-6 w-6" />
                  Yaklaşan Todo'lar
                </h2>
                <p className="text-emerald-100 mt-2">Önümüzdeki 30 gün içerisindeki görevleriniz</p>
              </div>
              
              <div className="p-6">
                <IncomingTodos />
              </div>
            </div>
          </motion.div>
        </section>

      </motion.div>
    </div>
  )
}

export default Dashboard