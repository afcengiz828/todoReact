import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { delTodo, updateTodoStatus } from '../../redux/features/todo/TodoSlice';
import ModalExample from '../ModalExample';
import { CheckCircle, Circle, AlertTriangle, ChevronUp, ChevronDown, Minus, XCircle } from 'lucide-react';

const IncomingTodos = () => {

    const selector = useSelector(state => state.all);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const priorityObj = {
        "low": "Low",
        "medium": "Medium",
        "high": "High"
    }

    useEffect(() => {

        getTodosByDate();

    }, [selector.allTodos]);

    const handleDelete = async (e, id) => {
        await dispatch(delTodo(id));


    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
                        <CheckCircle className="h-3 w-3" />
                        {status}
                    </span>
                );
            case 'in_progress':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        <Circle className="h-3 w-3" />
                        {status}
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
                        <AlertTriangle className="h-3 w-3" />
                        {status}
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200">
                        <XCircle className="h-3 w-3" />
                        {status}
                    </span>
                );
            default:
                return null;
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high':
                return <ChevronUp className="h-4 w-4 text-green-500" />;
            case 'medium':
                return <Minus className="h-4 w-4 text-yellow-500" />;
            case 'low':
                return <ChevronDown className="h-4 w-4 text-red-500" />;
            default:
                return null;
        }
    };

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
            <div class='min-w-full overflow-x-auto rounded-lg shadow-md '>
                <table class="table-auto min-w-full text-center divide-y divide-gray-200 bg-gray-100 ">
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
                    <tbody class="divide-y divide-gray-200" >


                        {data?.map((c) => {
                            return (
                                <tr key={c.id} className='hover:bg-gray-200'>
                                    <td class="px-4 py-3">{c.id}</td>
                                    <td>
                                        <Link to={`/tododetail/${c.id}`} >
                                            {c.title}
                                        </Link>

                                    </td>

                                    <td>{c.description}</td>

                                    <td>
                                        <div className='flex justify-center p-2'>
                                            <span className='mr-1'>
                                                {getStatusBadge(c.status)}
                                            </span>
                                            <select value={c.status} onChange={(e) => {
                                                handleStatus(e, c.id)
                                            }}>
                                                <option value="status">Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </td>

                                    <td>
                                        <div className='flex justify-center'>

                                            {getPriorityIcon(c.priority)}
                                        </div>
                                    </td>

                                    <td>{c.due_date ? c.due_date.split("T")[0] : ""}</td>


                                    <td className='cursor-pointer'>
                                        <div className='flex justify-center'>

                                            <i className='fas fa-trash' onClick={(e) => {
                                                handleDelete(e, c.id);
                                            }}></i>
                                        </div>

                                    </td>
                                    <td className='px-3 py-2'>
                                        <Link to={`/tododetail/${c.id}`} >
                                            <div className='flex justify-center'>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </div>


                                        </Link>
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