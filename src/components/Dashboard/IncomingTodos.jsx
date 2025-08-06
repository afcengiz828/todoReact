import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { delTodo, updateTodoStatus } from '../../redux/features/todo/TodoSlice';

const IncomingTodos = () => {

    const selector = useSelector(state => state.all);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const priorityObj = {
        "low" : "Low",
        "medium" : "Medium",
        "high" : "High"
    }

    useEffect(() => {
        
        getTodosByDate();

    }, [selector.allTodos]);

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
        
        
        const todos = selector.allTodos.filter(todo => {
            let due_date = new Date(todo.due_date);
            return due_date < date && due_date > today;
        });
        
        setData(todos);
        return todos;
    }


    return (
        <>
            <div class='min-w-full overflow-x-auto bg-white rounded-lg shadow-md '>
            <table class="table-auto min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" >


                    {data?.map((c) => {
                        return (
                            <tr key={c.id} >
                                <td class="px-4 py-3">{c.id}</td>
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

                                <td>{priorityObj[c.priority]}</td>

                                <td>{c.due_date ? c.due_date.split("T")[0] : ""}</td>


                                <td>
                                    <button class='' onClick={(e) => {
                                        handleDelete(e, c.id);
                                    }}>
                                        <i className='fas fa-trash'></i>
                                    </button>
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