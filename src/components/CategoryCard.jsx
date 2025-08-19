import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { delCategories, setId } from '../redux/features/categories/AllCategoriesSlice'
import { Hash, Edit3, Trash2, CheckCircle } from 'lucide-react'
import DeleteConfirmationModal from './DeleteConfirmationModal'

const CategoryCard = ({ category }) => {
  const dispatch = useDispatch()
  const selectorTodos = useSelector(state => state.todo)
  
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    categoryId: null,
    categoryName: ""
  })

  const handleDelete = async (e, id) => {
    const response = await dispatch(delCategories(id))
    console.log(response)
    closeDeleteModal()
  }

  const handleEdit = (e, id) => {
    console.log("Id set edildi. handleEdit çalıştı", id)
    dispatch(setId(id))
  }

  const openDeleteModal = (e, id, name) => {
    e.preventDefault()
    setDeleteModal({
      isOpen: true,
      categoryId: id,
      categoryName: name
    })
  }

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      categoryId: null,
      categoryName: ""
    })
  }

  const confirmDelete = (e) => {
    console.log(deleteModal.categoryId)
    handleDelete(e, deleteModal.categoryId)
  }

  const getTodoCount = (categoryId) => {
    if (!selectorTodos.data) return 0
    const todos = selectorTodos.data.filter(c => c.categories_id == categoryId)
    return todos.length
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ y: -2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl shadow-md flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {category.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {getTodoCount(category.id)} görev
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
              {category.color}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => handleEdit(e, category.id)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => openDeleteModal(e, category.id, category.name)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={deleteModal.categoryName}
        title="Kategoriyi Sil"
      />
    </>
  )
}

export default CategoryCard