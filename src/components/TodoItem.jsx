import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TodoItem = ({idList}) => {
    const selector = useSelector((state) => state.filter);
    
    
    
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
                    <th>Icons</th>
                </tr>   
            </thead>
            <tbody>
                {selector.filteredTodos.map((c) => {
                    return (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.title}</td>
                            <td>{c.description}</td>
                            <td>{c.status}</td>
                            <td>{c.priority}</td>
                            <td>{c.due_date}</td>
                            <td>{c.createdAt}</td>
                            <td>{c.updatedAt}</td>
                            <td>
                                <button>Delete</button>
                                <button>Edit</button>
                            </td>
                        </tr>
                    )
                })} 
            </tbody>
        </table>
    </div> 
  )
}

export default TodoItem