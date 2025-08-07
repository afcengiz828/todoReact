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

 
    

  return (
    <div className='h-screen bg-gray-50 dark:bg-gray-900'>
      <motion.div variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }} >

      <Header />
      <div  className='flex justify-center'>


      <table className='w-8/9 bg-gray-200 dark:bg-gray-500 border-0 rounded-2xl p-2 text-gray-900 dark:text-gray-200'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr key={c.id}>
            <td className='px-3 py-2'>
              <Link to={`/todoitem/${c.id}`} >
                {c.id}
              </Link>
            </td>
            <td className='px-3 py-2'>
              {c.title}

            </td>
            <td className='px-3 py-2'>{c.description}</td>
            <td className='px-3 py-2'>
              <select value={c.status} onChange={(e) => {
                handleStatus(e, c.id)
              }}>
                <option value="status">Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select> <br />
            </td>

            <td className='px-3 py-2 text-center'>{priorityObj[c.priority]}</td>

            <td className='w-auto px-3 py-2 text-nowrap'>{c.due_date ? c.due_date.split("T")[0] : ""}</td>


            <td className='px-3 py-2'>
              <button className='cursor-pointer' onClick={(e) => {
                handleDelete(e, c.id);
              }}>Delete</button>

            </td>
            <td className='px-3 py-2'>
              <Link to={`/tododetail/${c.id}`} >
                <div>Edit</div>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

              </motion.div>
    </div>
  )
}

export default TodoItem

