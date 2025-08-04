import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delTodo, getAllTodo, updateTodoStatus } from '../redux/features/todo/TodoSlice';
import { Link, Links } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { setFilteredStatus } from '../redux/features/todo/FilteredSlice';

const TodoList = () => {


    const selector = useSelector((state) => state.filter);
    const todoSelector = useSelector((state) => state.todo);
    const dispatch = useDispatch();
    const [pageCount, setPageCount] = useState();

    var limit = 10

    useEffect(() => {
        if (selector.filteredTodos.length > 0) {

            var count = Math.ceil(todoSelector.dataCount / 10);
            setPageCount(count);
            //console.log(selector.filteredTodos);
        }
    }, [selector.filteredTodos]);

    async function fetchData(page, limit) {
        if (!limit) {
            limit = 10
        }
        console.log(page)
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
        await dispatch(delTodo(id));
        window.location.reload(); //Alternatif ne kullanabiliriz sayfayı yenilemeden sadece render edecek birşey.

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
        window.location.reload(); //Alternatif ne kullanabiliriz sayfayı yenilemeden sadece render edecek birşey.

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
                    {/* {selector.filteredTodos.length>0  ? console.log(selector.filteredTodos) : "  "} */}


                    {selector.filteredTodos?.map((c) => {
                        return (


                            <tr key={c.id}>
                                <td>
                                    <Link to={`/todoitem/${c.id}`} >
                                        {c.id}
                                    </Link>
                                </td>
                                <td>
                                        {c.title}
                                    
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
                                    <Link to={`/tododetail/${c.id}`} >
                                    <div>Edit</div>
                                    </Link>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}

            />
        </div>
    )
}

export default TodoList