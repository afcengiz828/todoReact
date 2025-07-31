import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delTodo, getAllTodo } from '../redux/features/todo/TodoSlice';
import { Link, Links } from 'react-router-dom';
import TodoDetail from '../pages/TodoDetail';

const TodoItem = () => {
    const selector = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const handleDelete = async (e, id) => {
        await dispatch(delTodo(id));
        window.location.reload(); //Alternatif ne kullanbiliriz sayfayı yenilemeden sadece render edecek birşey.

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
                                    <Link to={`/tododetail/${c.id}`} >

                                        {c.title}
                                    </Link>

                                </td>
                                <td>{c.description}</td>

                                <td>{c.status}</td>

                                <td>{c.priority}</td>
                                <td>{c.due_date}</td>
                                <td>{c.created_at}</td>
                                <td>{c.updated_at}</td>
                                <td>
                                    <button onClick={(e) => {
                                        handleDelete(e, c.id);
                                    }}>Delete</button>
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