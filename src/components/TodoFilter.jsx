import React, { use, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { setFiltered, setFilteredStatus, updateFiltered } from '../redux/features/todo/FilteredSlice';

const TodoFilter = () => {

    const dispatch = useDispatch();
    var selector = useSelector((state) => state.all);
    var selectorTodo = useSelector((state) => state.todo);
    var filtered = useSelector((state) => state.filter);

    const todos = selector.allTodos;

    const [originalTodos, setOriginalTodos] = useState([]);


    //Search, filter and sorting terms.
    const [currentPriority, setCurrentPriority] = useState("");
    const [currentStatus, setCurrentStatus] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [sortValueDirection, setSortValueDirection] = useState("asc");
    const [sortValue, setSortValue] = useState("id");

    useEffect(() => {
        if ((currentPriority != "none" || currentStatus != "none" || searchValue.trim())) {
            console.log("filterstatus true oldu");
            dispatch(setFilteredStatus(true));
        }
        else {
            dispatch(setFilteredStatus(false));
        }

    }, [currentPriority, currentStatus, searchValue, sortValue, sortValueDirection]);



    const clearFilter = useCallback(() => {
        setCurrentPriority("none");
        setCurrentStatus("none");
        setSearchValue("");
        setSortValueDirection("asc");
        setSortValue("id");
    }, [filtered.filterStatus]);

    const handleSort = (param, data) => {

        var sorted = [];
        if (!param || !data) {
            return data;
        }
        switch (param) {
            case 'id':
                sorted = [...data].sort((a, b) => a.id - b.id);
                break;
            case 'title':
                sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'date':
                sorted = [...data].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
                break;
        }

        if (sortValueDirection != "asc") {
            handleAngle(sorted);
        }

        return sorted;

    }

    const handleAngle = (array) => {
        return array.reverse();
    }

    const handleSearch = (val, data) => {
        if (!val.trim()) {
            data = [...todos];
            return data;
        }
        else {
            const filtered = data.filter(todo => {
                return (
                    todo.title?.toLowerCase().includes(val.toLowerCase()) ||
                    todo.description?.toLowerCase().includes(val.toLowerCase())
                );
            });
            if (filtered.length > 0) {
                return filtered;
            } else {
                return []
            }

        }

    }

    const handleFilterPriority = (filter, data) => {
        if (!filter || !data || filter == "none") {
            return data;
        } else {
            var todosAsPriority = data.filter((todo) => {
                return todo.priority?.toLowerCase().includes(filter.toLowerCase());
            });

            return todosAsPriority;
        }

    }

    const handleFilterStatus = (filter, data) => {
        if (!filter || !data || filter == "none") {
            return data;
        }
        else {
            var todosStatus = data.filter((todo) => {
                return todo.status?.toLowerCase().includes(filter.toLowerCase());
            });
            return todosStatus;
        }

    }

    const allFilterOptions = useCallback(() => {
        let data = [];

        const todos = selector.allTodos;
        setOriginalTodos(todos);

        if (originalTodos.length == 0) {
            data = [...todos];
        } else {
            data = [...originalTodos];
        }

        data = handleSearch(searchValue, data); 

        if (data.length == 0) {
            dispatch(setFiltered(data))
        }


        if (currentPriority == "none" && currentStatus == "none") {

        }
        else if (currentPriority == "none" && currentStatus != "none") {
            data = handleFilterStatus(currentStatus, data);
        }
        else if (currentStatus == "none") {
            data = handleFilterPriority(currentPriority, data);
        }
        else {
            data = handleFilterPriority(currentPriority, data);
            data = handleFilterStatus(currentStatus, data);
        }


        data = handleSort(sortValue, data);


        if (data) {
            dispatch(updateFiltered(data));

        }
    }, [filtered.filterStatus,
    selector.allTodos,
        currentPriority,
        currentStatus,
        searchValue,
        sortValueDirection,
        sortValue
    ]);

    useEffect(() => {
        if (filtered.filterStatus) {
            allFilterOptions();
        }
        else {
            clearFilter();
        }
    }, [filtered.filterStatus, allFilterOptions, clearFilter]);


        return (
            <div className='flex flex-col md:flex-row justify-around md:justify-between p2 md:p-0 '>
                <div id='search' className='mx-2 my-1 text-gray-900 dark:text-gray-200 md:w-44 flex flex-col md:flex-row justify-center md:justify-between'>
                    <span className="text-center">
                        Arama: 
                    </span>
                    <input type="text" placeholder="Search.." className='mx-2 w-32 bg-transparent border-b border-red focus:outline-none' value={searchValue} onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}></input>
                </div>

                <div id='siralama' className='mx-2 my-1 pt-2 md:pt-0 text-gray-900 dark:text-gray-200 flex flex-col items-center md:flex-row justify-between'>
                    <span className="text-center">
                        Sıralama: 
                    </span>
                    <select  className='mb-2 md:mb-0 border rounded-2xl text-center no-arrow mx-2 w-32 dark:bg-gray-900' value={sortValue} onChange={(e) => {

                        setSortValue(e.target.value);

                    }}>
                        <option value="id">Id'ye Göre</option>
                        <option value="title">Title'a Göre</option>
                        <option value="date">Due Date'e Göre</option>
                    </select>
                    <select  className=' border rounded-2xl text-center no-arrow mx-2 w-16 dark:bg-gray-900' value={sortValueDirection} onChange={(e) => {
                        setSortValueDirection(e.target.value);
                    }}>
                        <option value="asc">Artan</option>
                        <option value="desc">Azalan</option>
                    </select>
                </div>

                <div id='filtre' className='mx-2 my-1 pt-2 md:pt-0 text-gray-900 dark:text-gray-200 flex flex-col items-center md:flex-row justify-center'>
                    Filtreleme: 
                    {/* status priority e göre filtreleme */}
                    <select  className='mb-2 md:mb-0 border rounded-2xl text-center no-arrow mx-2 w-24 dark:bg-gray-900' value={currentPriority} onChange={(e) => {
                        setCurrentPriority(e.target.value);
                    }}>
                        <option value="none">Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <select className=' border rounded-2xl text-center no-arrow mx-2 w-24 dark:bg-gray-900' value={currentStatus} onChange={(e) => {
                        setCurrentStatus(e.target.value);
                    }}>
                        <option value="none" >Status</option>
                        <option value="pending" >Pending</option>
                        <option value="in_progress" >In progress</option>
                        <option value="cancelled" >Cancelled</option>
                        <option value="completed" >Completed</option>
                    </select>
                </div>
            </div>
        )



}

export default TodoFilter

