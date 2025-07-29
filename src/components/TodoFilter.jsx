import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { updateList } from '../redux/features/todo/TodoSlice';

const TodoFilter = () => {
  
    const dispatch = useDispatch(); 
    var selector = useSelector((state) => state.todo);
    
    
    const todos = selector.data;
    const [originalTodos, setOriginalTodos] = useState([]);
    //console.log(todos); //todos geliyor.
    
    
    //Search, filter and sorting terms.
    const [currentPriority, setCurrentPriority] = useState("");
    const [currentStatus, setCurrentStatus] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [sortValueDirection, setSortValueDirection] = useState("asc");
    const [sortValue, setSortValue] = useState("id");
    
    useEffect(() => {
        allFilterOptions();
        


        console.log("Çalıştı");
        

    },[sortValue, sortValueDirection, currentPriority, currentStatus]);

    const handleSort = (param, data) => {
        var sorted = [];
        //console.log(data);
        if(!param || !data){
            return data;
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
        //console.log(sorted.push("sorted"))
            
        if(sortValueDirection != "asc"){
            handleAngle(sorted);
        }
    
        return sorted;

    }

    const handleAngle = (array) => {
        return array.reverse();     
    }
   
    const handleSearch = (val, data) => {

        if(!val || !val.trim()){
            return data;      
        }
        else{          
            const filtered = data.filter(todo => {               
                return (
                    todo.title?.toLowerCase().includes(val.toLowerCase()) ||
                    todo.description?.toLowerCase().includes(val.toLowerCase()) 
                );
            });
            return filtered;     
        }

    }

    const handleFilterPriority = (filter, data) => {
        if(!filter || !data){
            return data;
        }else{   
            var todosAsPriority = data.filter((todo) => {
                return todo.priority?.toLowerCase().includes(filter.toLowerCase());
            });
            
            return todosAsPriority;
        }

    }

    const handleFilterStatus = (filter, data) => {
        if(!filter || !data){
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
        console.log("Todos:");
        console.log(todos);
        setOriginalTodos(todos);
        //console.log(originalTodos);
        let data = [];

        if (originalTodos.length == 0) {
            data = [...todos];
        } else {
            data = [...originalTodos];
        }
        /*arama 
        priority 
        status
        sıralama*/ 

        console.log("Data:");
        console.log(data);

        data = handleSearch(searchValue, data);

        data = handleFilterPriority(currentPriority, data);
        
        data = handleFilterStatus(currentStatus, data);
        
        data = handleSort(sortValue, data);
        
        
        dispatch(updateList(data));    
    }
  
    return (
    <center>

        <div>
            <div id='search'>
                <input type="text" placeholder="Search.." value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value);
                    }}></input>    
            </div>
            <div id='siralama'>
                <select value={sortValue} onChange={(e) => {
                    console.log(e.target.value);
                    
                        setSortValue(e.target.value);
                    }}>
                    <option value="id">Id'ye Göre</option>
                    <option value="title">Title'a Göre</option>
                    <option value="date">Due date'e Göre</option>
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
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <select value={currentStatus} onChange={(e) => {
                    setCurrentStatus(e.target.value);
                }}>
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

