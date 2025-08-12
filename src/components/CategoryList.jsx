import { color, useScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delCategories, setId } from '../redux/features/categories/AllCategoriesSlice';
import { DiamondPercent } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const CategoryList = () => {

  const selector = useSelector(state => state.categories);
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

  return (
    <div className="p-4 w-screen flex-col justify-center items-center">
      <div className='flex-col justify-around mt-4'>
        <div className='flex justify-center overflow-x-auto text-gray-900 dark:text-gray-100'>
          <table className='bg-gray-300 dark:bg-gray-600 p-4 m-2 text-center border-0 rounded-2xl'>
            <thead className='p-2 mt-2'>
              <tr className='p-2'>
                <th className='px-3 py-2'>Name</th>
                <th className='px-3 py-2'>Color</th>
                <th className='px-3 py-2'>Todo Count</th>
                <th className='px-3 py-2'>Edit</th>
                <th className='px-3 py-2'>Delete</th>
              </tr>
            </thead>
            <tbody className='p-2'>
              { console.log(selector.data)}
              {
                selector.data.map((c) => {
                  return (

                    <tr className='text-center p-2'>
                      <td className='px-3 py-2'>{c.name}</td>
                      <td className='px-3 py-2 '>
                        <div className='border-0 rounded-2xl opacity-100 bg-white' style={{ backgroundColor: c.color, color: c.color }}>
                          0
                        </div>
                      </td>
                      <td className='px-3 py-2'>1</td>
                      <td className='px-3 py-2'>
                        <button
                          className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs cursor-pointer'
                          onClick={(e) => openDeleteModal(e, c.id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td className='px-3 py-2'>
                        <div
                          className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs inline-block cursor-pointer'
                          onClick={(e) => handleEdit(e, c.id)}>
                          Edit
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          itemName={deleteModal.categoryText}
          title="category Sil"
        />
      </div>
    </div>
  )
}

export default CategoryList