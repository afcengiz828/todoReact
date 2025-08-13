import { color, useScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delCategories, setId } from '../redux/features/categories/AllCategoriesSlice';
import { DiamondPercent } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const CategoryList = () => {

  const selector = useSelector(state => state.categories);
  const selectorTodos = useSelector(state => state.todo);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selector.data && selector.data.length > 0) {
      console.log(selector.data);
    }
  }, [selector.data]);

  const handleDelete = async (e, id) => {
    const response = await dispatch(delCategories(id));
    console.log(response)
  }

  const handleEdit = (e, id) => {
    console.log("Id set edildi. handleEdit çalıştı", id);
    dispatch(setId(id));
  }

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    categoryId: null,
    categoryText: ""
  });

  const openDeleteModal = (e, id) => {
    setDeleteModal({
      isOpen: true,
      categoryId: id,
      categoryText: e.target.value
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      categoryId: null,
      categoryText: ""
    });
  };

  const confirmDelete = (e) => {
    console.log(deleteModal.categoryId);
    handleDelete(e, deleteModal.categoryId);
  };

  const getTodoCount = (category) => {
    //console.log(selectorTodos.data);
    const todos = selectorTodos.data.filter(c => c.categories_id == category);
    return todos.length;
  }

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .responsive-table,
          .responsive-table thead,
          .responsive-table tbody,
          .responsive-table th,
          .responsive-table td,
          .responsive-table tr {
            display: block !important;
          }
          
          .responsive-table thead tr {
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
          }
          
          .responsive-table tr {
            border: 1px solid #ccc !important;
            margin-bottom: 15px !important;
            padding: 15px !important;
            border-radius: 12px !important;
            background: white !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
          }
          
          .dark .responsive-table tr {
            background: rgb(75 85 99) !important;
            border-color: rgb(107 114 128) !important;
          }
          
          .responsive-table td {
            border: none !important;
            position: relative !important;
            padding-left: 35% !important;
            padding-top: 10px !important;
            padding-bottom: 10px !important;
            min-height: 40px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center;  

          }
          
          .responsive-table td:before {
            content: attr(data-label) ": " !important;
            position: absolute !important;
            left: 6px !important;
            width: 30% !important;
            padding-right: 10px !important;
            white-space: nowrap !important;
            font-weight: bold !important;
            color: #666 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: start;

          }
          
          .dark .responsive-table td:before {
            color: #d1d5db !important;
            
          }
          
          .responsive-table .color-cell {
            justify-content: flex-center !important;
          }
          
          .responsive-table .action-buttons {
            gap: 8px !important;
            flex-wrap: wrap !important;
          }
        }
        
        @media (min-width: 768px) {
          .responsive-table {
            display: table !important;
          }
          
          .responsive-table thead {
            display: table-header-group !important;
          }
          
          .responsive-table tbody {
            display: table-row-group !important;
          }
          
          .responsive-table tr {
            display: table-row !important;
          }
          
          .responsive-table th,
          .responsive-table td {
            display: table-cell !important;
          }
        }
      `}</style>

      <div className="p-4 w-full max-w-6xl mx-auto flex-col justify-center items-center">
        <div className='flex-col justify-around mt-4'>
          <div className='flex justify-center overflow-x-auto text-gray-900 dark:text-gray-100'>
            <table className='responsive-table w-full bg-gray-300 dark:bg-gray-600 border-0 rounded-2xl'>
              <thead className='p-2 mt-2'>
                <tr className='p-2'>
                  <th className='px-3 py-3 text-left'>Name</th>
                  <th className='px-3 py-3 text-center'>Color</th>
                  <th className='px-3 py-3 text-center'>Todo Count</th>
                  <th className='px-3 py-3 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='p-2'>
                {console.log(selector.data)}
                {
                  selector.data.map((c) => {
                    return (
                      <tr key={c.id} className='text-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
                        <td className='px-3 py-3 text-left font-medium' data-label="Name">
                          {c.name}
                        </td>
                        <td className='px-3 py-3 color-cell' data-label="Color">
                          <div className='flex items-center justify-center'>
                            <div 
                              className='w-8 h-8 border-2 border-white dark:border-gray-800 rounded-full shadow-sm mx-auto' 
                              style={{ backgroundColor: c.color }}
                              title={c.color}
                            >
                            </div>
                          </div>
                        </td>
                        <td className='px-3 py-3' data-label="Todo Count">
                          <span className='inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'>
                            {getTodoCount(c.id)}
                          </span>
                        </td>
                        <td className='px-3 py-3' data-label="Actions">
                          <div className='flex items-center justify-center gap-2 action-buttons'>
                            <div
                              className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs inline-block cursor-pointer transition-colors'
                              onClick={(e) => handleEdit(e, c.id)}
                            >
                              Edit
                            </div>
                            <button
                              className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs cursor-pointer transition-colors'
                              onClick={(e) => openDeleteModal(e, c.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          
          {/* Veri yoksa gösterilecek mesaj */}
          {selector.data && selector.data.length === 0 && (
            <div className='text-center bg-yellow-500 dark:bg-yellow-600 text-white p-4 border-0 rounded-2xl mt-4'>
              Henüz kategori bulunmuyor...
            </div>
          )}
          
          <DeleteConfirmationModal
            isOpen={deleteModal.isOpen}
            onClose={closeDeleteModal}
            onConfirm={confirmDelete}
            itemName={deleteModal.categoryText}
            title="Kategoriyi Sil"
          />
        </div>
      </div>
    </>
  )
}

export default CategoryList