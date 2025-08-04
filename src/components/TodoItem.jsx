import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delTodo, getAllTodo, updateTodoStatus } from '../redux/features/todo/TodoSlice';
import { Link, Links, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { setFilteredStatus } from '../redux/features/todo/FilteredSlice';

const TodoItem = () => {

  const [c, setC] = useState({});
  const selector = useSelector(state => state.all);
  const id = useParams();

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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{c.id}</td>
            <td>{c.title}</td>
            <td>{c.description}</td>
            <td>
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
            <td>{c.priority}</td>
            <td>{c.due_date ? c.due_date.split("T")[0] : ""}</td>
            <td>{c.created_at ? c.created_at.split("T")[0] : ""}</td>
            <td>{c.updated_at ? c.updated_at.split("T")[0] : ""}</td>
            <td>
              <button onClick={(e) => {
                handleDelete(e, c.id);
              }}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TodoItem