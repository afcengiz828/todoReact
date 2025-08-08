import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delTodo, getAllTodo, updateTodoStatus } from '../redux/features/todo/TodoSlice';
import { Link, Links } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { setFilteredStatus } from '../redux/features/todo/FilteredSlice';

const TodoList = () => {


    const dispatch = useDispatch();
    const selector = useSelector((state) => state.filter);
    const todoSelector = useSelector((state) => state.todo);
    const allSelector = useSelector((state) => state.all);

    //const [pageCount, setPageCount] = useState(1);
    const [list, setList] = useState([]);

    const priorityObj = {
        "low": "Low",
        "medium": "Medium",
        "high": "High"
    }

    var limit = 10


    useEffect(() => {
        if (selector.filteredTodos.length > 0) {

            var count = Math.ceil(allSelector.dataCount / 10);

            if (selector.filterStatus) {
                //console.log(selector.filteredTodos);  
                setList(selector.filteredTodos);


            } else {
                console.log(selector.filterStatus);

                setList(todoSelector.data);
            }
            setPageCount(count);
            //console.log(selector.filteredTodos);
        } else {
            setList([]);
        }
    }, [selector.filteredTodos, selector.filterStatus]);

    async function fetchData(page, limit) {
        if (!limit) {
            limit = 10
        }

        await dispatch(getAllTodo(`?page=${page}&limit=${limit}`)).then((response) => {
            if (response.type == "gettodo/fulfilled") {
                console.log("Veri başarıyla yüklendi.", response);
            }
            else {
                console.log(response);
            }
        })
    }

    const handleDelete = async (e, id) => {
        const response = await dispatch(delTodo(id));
        console.log(response.payload.data);

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
        //window.location.reload(); //Alternatif ne kullanabiliriz sayfayı yenilemeden sadece render edecek birşey.

        console.log(response);
    }

    const handlePageClick = (data) => {
        console.log(data.selected + 1);
        fetchData(data.selected + 1, 10);
        if (selector.filterStatus) {
            dispatch(setFilteredStatus(false));
        }
    }


    if (todoSelector.loading) {
        return (
            <>
                <div className='text-center border-0 rounded-2xl font-bold w-full bg-blue-300 text-2xl p-4 mt-4'>
                    Veri yükleniyor
                </div>
            </>
        )
    } else {


        if (list.length == 0) {
            return (
                <>
                    <div className='bg-gray-200 dark:bg-gray-900'>

                        <div className='text-center bg-red-500 p-4 border-0 rounded-2xl mt-4'>
                            Aradığınız todo bulunamadı...
                        </div>
                    </div>
                </>
            )
        }
        else {

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
                                        {list?.map((c) => {
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
                                                    <td className='px-3 py-2 whitespace-nowrap' data-label="Due Date">
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

        }
    }

}

export default TodoList