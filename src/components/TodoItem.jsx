import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delTodo, getAllTodo, updateTodoStatus } from '../redux/features/todo/TodoSlice';
import { Link, Links, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { setFilteredStatus } from '../redux/features/todo/FilteredSlice';
import Header from './Header';
import { motion } from "framer-motion";


const TodoItem = () => {

  const [c, setC] = useState({});
  const selector = useSelector(state => state.all);
  const id = useParams();
  const selectorDark = useSelector(state => state.dark);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectorDark.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selectorDark.dark]);

  useEffect(() => {
    if (selector.allTodos.length > 0) {
      console.log(selector.allTodos)
      const todos = selector.allTodos.filter((data) => data.id == id.c);

      if (todos.length > 0) {
        setC(todos[0]);
      }
      console.log(c);

    }

  }, [selector.allTodos])

  const pageTransition = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const priorityObj = {
    "low": "Low",
    "medium": "Medium",
    "high": "High"
  }


    const handleStatus = async (e, id) => {
        console.log(e.target.value);
        const idObj = {
            "id": id
        }
        const dataObj = {
            "status": e.target.value,
        }
        const data = {
            idObj,
            dataObj
        }
        console.log(data)
        const response = await dispatch(updateTodoStatus(data));


        console.log(response);
    }


  return (
    <>
      <div className='h-screen bg-gray-50 dark:bg-gray-900'>
        <motion.div variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }} >

          <Header />


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
                    margin-bottom: 10px !important;
                    padding: 10px !important;
                    border-radius: 8px !important;
                    background: white !important;
                  }
                  
                  .responsive-table td {
                    border: none !important;
                    position: relative !important;
                    padding-left: 50% !important;
                    padding-top: 8px !important;
                    padding-bottom: 8px !important;
                  }
                  
                  .responsive-table td:before {
                    content: attr(data-label) ": " !important;
                    position: absolute !important;
                    left: 6px !important;
                    width: 45% !important;
                    padding-right: 10px !important;
                    white-space: nowrap !important;
                    font-weight: bold !important;
                    color: #666 !important;
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

          <div className="p-4">


            <div className='flex-col justify-around mt-4'>
              <div className='flex justify-center overflow-x-auto text-gray-900 dark:text-gray-100'>
                <table className='responsive-table w-full text-center text-xs bg-gray-300 dark:bg-gray-600 border-0 rounded-2xl p-2'>
                  <thead>
                    <tr>
                      <th className='px-3 py-2'>Title</th>
                      <th className='px-3 py-2'>Description</th>
                      <th className='px-3 py-2'>Status</th>
                      <th className='px-3 py-2'>Priority</th>
                      <th className='px-3 py-2'>Due Date</th>
                      <th className='px-3 py-2'>Delete</th>
                      <th className='px-3 py-2'>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                        <tr key={c.id}>
                          <td className='px-3 py-2' data-label="Title">
                              {c.title}
                          </td>
                          <td className='px-3 py-2' data-label="Description">
                            {c.description}
                          </td>
                          <td className='px-3 py-2' data-label="Status">
                            <select
                              value={c.status}
                              onChange={(e) => handleStatus(e, c.id)}
                              className="bg-white border rounded px-2 py-1"
                            >
                              <option value="status">Status</option>
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className='px-3 py-2' data-label="Priority">
                            {priorityObj[c.priority]}
                          </td>
                          <td className='px-3 py-2' data-label="Due Date">
                            {c.due_date ? c.due_date.split("T")[0] : ""}
                          </td>
                          <td className='px-3 py-2' data-label="Delete">
                            <button
                              className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs'
                              onClick={(e) => handleDelete(e, c.id)}
                            >
                              Delete
                            </button>
                          </td>
                          <td className='px-3 py-2' data-label="Edit">
                            <Link to={`../tododetail/${c.id}`}>
                              <div className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs inline-block'>
                                Edit
                              </div>
                            </Link>
                          </td>
                        </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </>
  )
}

export default TodoItem

