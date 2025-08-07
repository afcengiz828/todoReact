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

    const [pageCount, setPageCount] = useState(1);
    const [list, setList] = useState();

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
        //window.location.reload(); //Alternatif ne kullanabiliriz sayfayı yenilemeden sadece render edecek birşey.

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

    return (

            <div className='flex-col justify-around mt-4 bg-gray-50'>
                <div className='flex justify-center '>

                
                <table className='w-8/9 text-center bg-gray-300 border-0 rounded-2xl p-2'>
                    <thead>
                        <tr>
                            <th className='px-3 py-2'>Id</th>
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
                                    <td className='px-3 py-2'>
                                        <Link to={`/todoitem/${c.id}`} >
                                            {c.id}
                                        </Link>
                                    </td>
                                    <td className='px-3 py-2'>
                                        {c.title}

                                    </td>
                                    <td className='px-3 py-2'>{c.description}</td>
                                    <td className='px-3 py-2'>
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

                                    <td className='px-3 py-2'>{priorityObj[c.priority]}</td>


                                    <td className='w-auto px-3 py-2 text-nowrap'>{c.due_date ? c.due_date.split("T")[0] : ""}</td>


                                    <td className='px-3 py-2'>
                                        <button className='cursor-pointer' onClick={(e) => {
                                            handleDelete(e, c.id);
                                        }}>Delete</button>
                                        
                                    </td>
                                    <td  className='px-3 py-2'>
                                        <Link to={`/tododetail/${c.id}`} >
                                            <div>Edit</div>
                                        </Link>
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>

                </div>
                <div>

                    {/* <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                    /> */}

                </div>
            </div>
    )
}

export default TodoList