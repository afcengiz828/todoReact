import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { delTodo, updateTodoStatus } from '../../redux/features/todo/TodoSlice';

const IncomingTodos = () => {

    const selector = useSelector(state => state.todo);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        
        getTodosByDate();

    }, [selector.data]);

    const handleDelete = async (e, id) => {
        await dispatch(delTodo(id));
        window.location.reload(); //Alternatif ne kullanabiliriz sayfayı yenilemeden sadece render edecek birşey.

    }
    

    const handleStatus = async (e, id) => {
            console.log(e.target.value);
            const idObj = {
                "id" : id
            }
            const dataObj = {
                "status" : e.target.value,
            }
            const data = {
                idObj,
                dataObj
            }
            console.log(data)
            const response = await dispatch(updateTodoStatus(data));
            window.location.reload(); //Alternatif ne kullanabiliriz sayfayı yenilemeden sadece render edecek birşey.
    
            console.log(response);
        }

    const getTodosByDate = () => {
        const today = new Date();
        const date = new Date();

        date.setDate(today.getDate() + 30);
        
        const todos = selector.data.filter(todo => todo.due_date < date);
        setData(todos);
        return todos;
    }


    return (
        <>
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


                    {data?.map((c) => {
                        return (


                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>
                                    <Link to={`/tododetail/${c.id}`} >

                                        {c.title}
                                    </Link>

                                </td>

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

                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default IncomingTodos