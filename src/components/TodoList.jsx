import React, { useEffect, useRef, useState } from 'react'
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
    const categorySelector = useSelector((state) => state.categories);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [list, setList] = useState([]);
    const [currentTodos, setCurrentTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [todosPerPage, setTodosPerPage] = useState(10);

    const lastTodoIndex = currentPage * todosPerPage;
    const firstTodoIndex = lastTodoIndex - todosPerPage;

    const priorityObj = {
        "low": "Low",
        "medium": "Medium",
        "high": "High"
    }

    var limit = 10;
    
    // Toplam sayfa sayısını hesapla
    const totalPages = Math.ceil((selector.filterStatus ? selector.filteredTodos.length : allSelector.dataCount) / todosPerPage);

    // Mevcut sayfanın geçerli olup olmadığını kontrol et ve gerekirse düzelt
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0 && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    useEffect(() => {
        if (selector.filteredTodos.length > 0) {
            if (selector.filterStatus) {
                console.log(selector.filterStatus);  
                setCurrentTodos(selector.filteredTodos.slice(firstTodoIndex, lastTodoIndex));
            } else {
                console.log(selector.filterStatus);
                setCurrentTodos(allSelector.allTodos.slice(firstTodoIndex, lastTodoIndex));
            }
        } else {
            console.log(selector.filteredTodos);
            // allTodos'dan al
            setCurrentTodos(allSelector.allTodos?.slice(firstTodoIndex, lastTodoIndex) || []);
        }
    }, [selector.filteredTodos, selector.filterStatus, currentPage, firstTodoIndex, lastTodoIndex, allSelector.allTodos, categorySelector.data]);

    useEffect(() => {
        if (list.length > 0) {
            setCurrentTodos(list.slice(firstTodoIndex, lastTodoIndex));
        }
    }, [list, currentPage, firstTodoIndex, lastTodoIndex]);

    // Prev/Next butonlarının durumunu kontrol et
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages || totalPages === 0;

    useEffect(() => {
        // Prev butonunu güncelle
        if (prevRef.current) {
            if (isPrevDisabled) {
                prevRef.current.classList.add("disabled");
            } else {
                prevRef.current.classList.remove("disabled");
            }
        }

        // Next butonunu güncelle
        if (nextRef.current) {
            if (isNextDisabled) {
                nextRef.current.classList.add("disabled");
            } else {
                nextRef.current.classList.remove("disabled");
            }
        }
    }, [currentPage, isPrevDisabled, isNextDisabled, totalPages]);


 
    const handlePrevious = () => {
        if (!isPrevDisabled) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (!isNextDisabled) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handleDelete = async (e, id) => {
        const response = await dispatch(delTodo(id));
        console.log(response.payload.data);
        
        
        const newTotalItems = (selector.filterStatus ? selector.filteredTodos.length : allSelector.dataCount) - 1;
        const newTotalPages = Math.ceil(newTotalItems / todosPerPage);
        
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        }
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
        console.log(response);
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

        if (currentTodos.length == 0 && totalPages === 0) {
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

                        .disabled {
                            pointer-events: none;
                            opacity: 0.5;
                            cursor: not-allowed;
                        }
                    `}</style>

                    <div className="p-4 w-screen flex-col justify-center items-center">
                        <div className='flex-col justify-around mt-4'>
                            <div className='flex justify-center overflow-x-auto text-gray-900 dark:text-gray-100'>
                                <table className='responsive-table w-full text-center text-xs bg-gray-300 dark:bg-gray-600 border-0 rounded-2xl p-2'>
                                    <thead>
                                        <tr>
                                            <th className='px-3 py-2'>Category</th>
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
                                        {currentTodos.map((c) => {
                                            return (
                                                <tr key={c.id}>
                                                    <td className='px-3 py-2' data-label="Title">
                                                        <Link to={`../todoitem/${c.id}`} style={{color:c.categories.color}} className="text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-400">
                                                            {c.categories.name}
                                                        </Link>
                                                    </td>
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

                                                            })()
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

                        <div className='flex justify-center mt-4'>
                            <div className='bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 h-8 w-64 border-0 rounded-2xl flex justify-center'>
                                <div 
                                    ref={prevRef} 
                                    className='w-1/3 h-full flex justify-center items-center cursor-pointer' 
                                    onClick={handlePrevious}
                                >
                                    Prev
                                </div>
                                <div className='w-1/3 h-full flex justify-center items-center'>
                                    {currentPage} / {totalPages || 1}
                                </div>
                                <div 
                                    ref={nextRef} 
                                    className='w-1/3 h-full flex justify-center items-center cursor-pointer' 
                                    onClick={handleNext}
                                >
                                    Next
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )

        }
    }

}

export default TodoList