import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Hash } from 'lucide-react'
import CategoryCard from './CategoryCard'

const CategoryList = () => {
  const selector = useSelector(state => state.categories)

  useEffect(() => {
    if (selector.data && selector.data.length > 0) {
      console.log(selector.data)
    }
  }, [selector.data])

  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Mevcut Kategoriler
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {selector.data ? selector.data.length : 0} kategori mevcut
        </p>
      </div>

      {!selector.data || selector.data.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Hash className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
            Henüz kategori yok
          </h4>
          <p className="text-yellow-600 dark:text-yellow-400">
            İlk kategorinizi oluşturarak başlayın
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selector.data.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryList