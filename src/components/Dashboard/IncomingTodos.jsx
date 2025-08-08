import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { delTodo, updateTodoStatus } from '../../redux/features/todo/TodoSlice';
import ModalExample from '../ModalExample';
import { CheckCircle, Circle, AlertTriangle, ChevronUp, ChevronDown, Minus, XCircle } from 'lucide-react';

const IncomingTodos = () => {

    const selector = useSelector(state => state.all);
    const todo = useSelector(state => state.todo);

    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

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
        const response = await dispatch(delTodo(id));
        if (response.payload.status == "succes") {
            setIsOpen(true);
        }
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

    if (todo.loading) {
        return (
            <>
                <div className='text-center text-gray-900 dark:text-gray-900 border-0 rounded-2xl font-bold w-full bg-blue-300 dark:bg-blue-300 text-2xl p-4'>
                    Veri yükleniyor
                </div>
            </>
        )
    }
    else {
        if (todo.error) {
            return (
                <>
                    <div className='text-center border-0 rounded-2xl bg-red-500 dark:bg-red-500  text-amber-100 dark:text-blue-500  p-4'>
                        <h1 className='font-bold text-2xl'>
                            Error var
                        </h1>
                        <p>
                            {todo.error}
                        </p>

                    </div>
                </>
            )
        }

        if (data.length > 0) {

            return (
                <>
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
                           background: gray-200 !important;
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
                            <div className='flex justify-center overflow-x-auto text-gray-900  dark:text-gray-100'>
                                <table className='responsive-table text-gray-900 dark:text-gray-200 w-full text-center text-xs bg-gray-300 dark:bg-gray-600 border-0 rounded-2xl p-2'>
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
                                        {data?.map((c) => {
                                            return (
                                                <tr key={c.id}>
                                                    <td className='px-3 py-2' data-label="Title">
                                                        <Link to={`../todoitem/${c.id}`} className="text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-400">
                                                            {c.title}
                                                        </Link>
                                                    </td>
                                                    <td className='px-3 py-2' data-label="Description">
                                                        {c.description}
                                                    </td>
                                                    <td className='px-3 py-2' data-label="Status">
                                                        {
                                                            (() => {
                                                                console.log(c.status)
                                                                if (c.status) {
                                                                    return (
                                                                        <select
                                                                            value={c.status}
                                                                            onChange={(e) => handleStatus(e, c.id)}
                                                                            className="bg-white dark:bg-gray-500 border rounded px-2 py-1"
                                                                        >
                                                                            <option value="status">Status</option>
                                                                            <option value="pending">Pending</option>
                                                                            <option value="in_progress">In Progress</option>
                                                                            <option value="completed">Completed</option>
                                                                            <option value="cancelled">Cancelled</option>
                                                                        </select>
                                                                    )
                                                                }
                                                                else {
                                                                    return "";
                                                                }
                                                            
                                                            }) ()
                                                        }
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
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='bg-red-500 text-amber-100 font-bold border rounded-2xl text-center m-4 p-4'>
                        <p>
                            30 gün içerisinde todo yok
                        </p>
                    </div>
                </>
            )
        }

    }

}

export default IncomingTodos