import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTodo } from '../redux/features/todo/TodoSlice';

const TodoItem = () => {
    const selector = useSelector((state) => state.filter);

    const handleId = (e, id) => {
        
    } 
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
                {/*console.log(selector.filteredTodos)*/}
                
                
                {selector.filteredTodos?.map((c) => {
                    return (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td onClick={(e) => {
                                handleId(e, c.id);
                            }}> 
                                {c.title}                                
                            </td>
                            <td>{c.description}</td>
                            <td>{c.status}</td>
                            <td>{c.priority}</td>
                            <td>{c.due_date}</td>
                            <td>{c.created_at}</td>
                            <td>{c.updated_at}</td>
                            <td>
                                <button >Delete</button>
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