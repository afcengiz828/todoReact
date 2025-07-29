import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { updateList } from '../redux/features/todo/TodoSlice';

const TodoFilter = () => {
  
    const dispatch = useDispatch(); 
    var selector = useSelector((state) => state.todo);
    
    
    const todos = selector.data;
    const [originalTodos, setOriginalTodos] = useState([]);
    
    
    //Search, filter and sorting terms.
    const [currentPriority, setCurrentPriority] = useState("");
    const [currentStatus, setCurrentStatus] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [sortValueDirection, setSortValueDirection] = useState("asc");
    const [sortValue, setSortValue] = useState("id");
    
    useEffect(() => {
        allFilterOptions();
    
    },[sortValue, sortValueDirection, currentPriority, currentStatus, searchValue]);

    const handleSort = (param, data) => {
        // console.log(param);
        // console.log(data);
        var sorted = [];
        if(!param){
            return data;
        }
        else if(!data){
            return false;
        }
        switch (param){
            case 'id': 
            sorted = data.sort((a, b) => a.id - b.id);
            break;
            case 'title': 
            sorted = data.sort((a, b) => a.title.localeCompare(b.title));
            break;
            case 'date':
                sorted = data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
                break;
        }   
            
        if(sortValueDirection != "asc"){
            handleAngle(sorted);
        }
        return sorted;

    }

    const handleAngle = (array) => {
        return array.reverse();     
    }
   
    const handleSearch = (val, data) => {
        if(!val.trim()){
            console.log(data)
            data = [...todos];
            console.log(todos)
            console.log(data)
            return data;    
        }
        else{          
            const filtered = data.filter(todo => {               
                return (
                    todo.title?.toLowerCase().includes(val.toLowerCase()) ||
                    todo.description?.toLowerCase().includes(val.toLowerCase()) 
                );
            });
            //console.log(val);
            //console.log(filtered)
            return filtered;     
        }

    }

    const handleFilterPriority = (filter, data) => {
        if(!filter || !data || filter=="none"){
            return data;
        }else{   
            var todosAsPriority = data.filter((todo) => {
                return todo.priority?.toLowerCase().includes(filter.toLowerCase());
            });
            
            return todosAsPriority;
        }

    }

    const handleFilterStatus = (filter, data) => {
        if(!filter || !data || filter == "none"){
            return data;
        }
        else{
            var todosStatus = data.filter((todo) => {
                return todo.status?.toLowerCase().includes(filter.toLowerCase());
            });
            return todosStatus;
        }

    }

    const allFilterOptions = () => {
        setOriginalTodos(todos);
        let data = [];

        if (originalTodos.length == 0) {
            data = [...todos];
        } else {
            data = [...originalTodos];
        }

        
        data = handleSearch(searchValue, data);

        if(!data){   
            if (originalTodos.length == 0) {
                data = [...todos];
            } else {
                data = [...originalTodos];
            }
        }

        console.log(data);


        if(currentPriority=="none" && currentStatus == "none"){
            if (originalTodos.length == 0) {
                data = [...todos];
            } else {
                data = [...originalTodos];
            }
        }
        else if(currentPriority=="none"){
            data = handleFilterStatus(currentStatus, data);
        }
        else if(currentStatus){
            data = handleFilterPriority(currentPriority, data);
        }
        else{
            data = handleFilterPriority(currentPriority, data);
            data = handleFilterStatus(currentStatus, data);
        }





        data = handleSort(sortValue, data);
        
        
        
        //dispatch(updateList(data));    
    }
  
    return (
    <center>

        <div>
            <div id='search'>
                <input type="text" placeholder="Search.." value={searchValue} onChange={(e) => {
                    console.log(e.target.value);
                    setSearchValue(e.target.value);
                    //console.log("htmlde set edilen search value");
                    //console.log(searchValue);
                    }}></input>    
            </div>
            <div id='siralama'>
                <select value={sortValue} onChange={(e) => {
                    
                        setSortValue(e.target.value);

                    }}>
                    <option value="id">Id'ye Göre</option>
                    <option value="title">Title'a Göre</option>
                    <option value="date">Due Date'e Göre</option>
                </select>
                <select value={sortValueDirection} onChange={(e) => {
                    setSortValueDirection(e.target.value);
                }}>
                    <option value="asc">Artan</option>
                    <option value="desc">Azalan</option>
                </select>
            </div>
            <div id='filtre'>
                {/* status priority ve due date e göre filtreleme */}
                <select value={currentPriority} onChange={(e) => {
                    setCurrentPriority(e.target.value);
                }}>
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <select value={currentStatus} onChange={(e) => {
                    setCurrentStatus(e.target.value);
                }}>
                    <option value="none">None</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In progress</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </div>
    </center>
  )
}

export default TodoFilter

