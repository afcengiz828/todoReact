import React, { use, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFiltered, setFilteredStatus, updateFiltered } from '../redux/features/todo/FilteredSlice';

const TodoFilter = () => {

    const dispatch = useDispatch();
    var selector = useSelector((state) => state.all);
    var selectorTodo = useSelector((state) => state.todo);
    var filtered = useSelector((state) => state.filter);
    var categorySelector = useSelector(state => state.categories);


    const todos = selector.allTodos;

    const [originalTodos, setOriginalTodos] = useState([]);


    //Search, filter and sorting terms.
    const [currentPriority, setCurrentPriority] = useState("");
    const [currentStatus, setCurrentStatus] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [sortValueDirection, setSortValueDirection] = useState("asc");
    const [sortValue, setSortValue] = useState("id");
    const [currentCategory, setCurrentCategory] = useState("");

    useEffect(() => {
        if ((currentPriority != "none" || currentStatus != "none" || searchValue.trim())) {
            
            dispatch(setFilteredStatus(true));
        }
        else {
            dispatch(setFilteredStatus(false));
        }

    }, [currentPriority, currentStatus, searchValue, sortValue, sortValueDirection, currentCategory]);



    const clearFilter = useCallback(() => {
        setCurrentPriority("none");
        setCurrentStatus("none");
        setSearchValue("");
        setSortValueDirection("asc");
        setSortValue("id");
        setCurrentCategory("");
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

    const handleCategory = (c, data) => {
        if (!c || !data || c == "none") {
            return data;
        }
        else {
            var todosCategory = data.filter((todo) => {
                return todo.categories.name?.toLowerCase().includes(c.toLowerCase());
            });
            return todosCategory;
        }
    }

    const applyFilters = (data, currentPriority, currentStatus, currentCategory) => {
        let filteredData = data;

        if (currentPriority !== "none") {
            filteredData = handleFilterPriority(currentPriority, filteredData);
        }

        if (currentStatus !== "none") {
            filteredData = handleFilterStatus(currentStatus, filteredData);
        }

        if (currentCategory !== "none") {
            filteredData = handleCategory(currentCategory, filteredData);
        }

        return filteredData;
    };

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
        data = applyFilters(data, currentPriority, currentStatus, currentCategory);

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
        sortValue,
        currentCategory
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
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6 backdrop-blur-sm'>
            <div className='flex flex-col lg:flex-row gap-6 items-center justify-between'>
                
                {/* Search Section */}
                <div className='flex flex-col sm:flex-row items-center gap-3 min-w-0 flex-1'>
                    <label className='text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap'>
                        🔍 Arama:
                    </label>
                    <div className='relative flex-1 max-w-xs'>
                        <input 
                            type="text" 
                            placeholder="Ara..." 
                            className='w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600' 
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>

                {/* Sorting Section */}
                <div className='flex flex-col sm:flex-row items-center gap-3 min-w-0 flex-1'>
                    <label className='text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap'>
                        📊 Sıralama:
                    </label>
                    <div className='flex gap-2 flex-wrap'>
                        <select 
                            className='px-3 py-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer min-w-[120px]' 
                            value={sortValue} 
                            onChange={(e) => setSortValue(e.target.value)}
                        >
                            <option value="id">🆔 Id'ye Göre</option>
                            <option value="title">📝 Title'a Göre</option>
                            <option value="date">📅 Due Date'e Göre</option>
                        </select>
                        <select 
                            className='px-3 py-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer min-w-[80px]' 
                            value={sortValueDirection} 
                            onChange={(e) => setSortValueDirection(e.target.value)}
                        >
                            <option value="asc">⬆️ Artan</option>
                            <option value="desc">⬇️ Azalan</option>
                        </select>
                    </div>
                </div>

                {/* Filtering Section */}
                <div className='flex flex-col sm:flex-row items-center gap-3 min-w-0 flex-1'>
                    <label className='text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap'>
                        🎯 Filtreleme:
                    </label>
                    <div className='flex gap-2 flex-wrap'>
                        <select 
                            className='px-3 py-2.5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer min-w-[90px]' 
                            value={currentPriority} 
                            onChange={(e) => setCurrentPriority(e.target.value)}
                        >
                            <option value="none">Priority</option>
                            <option value="low">🟢 Low</option>
                            <option value="medium">🟡 Medium</option>
                            <option value="high">🔴 High</option>
                        </select>
                        <select 
                            className='px-3 py-2.5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer min-w-[100px]' 
                            value={currentStatus} 
                            onChange={(e) => setCurrentStatus(e.target.value)}
                        >
                            <option value="none">Status</option>
                            <option value="pending">⏳ Pending</option>
                            <option value="in_progress">🚀 In progress</option>
                            <option value="cancelled">❌ Cancelled</option>
                            <option value="completed">✅ Completed</option>
                        </select>
                        <select 
                            className='px-3 py-2.5 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer min-w-[90px]' 
                            value={currentCategory}
                            onChange={(e) => setCurrentCategory(e.target.value)}
                        >
                            <option value="">🏷️ Category</option>
                            {
                                categorySelector.data.map((c, index) => {
                                    return (
                                        <option key={index} value={c.name.toLowerCase()}>{c.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                {/* Clear Filters Button */}
                <div className='flex items-center'>
                    <button
                        onClick={clearFilter}
                        className='px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-sm'
                    >
                        🗑️ Temizle
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoFilter