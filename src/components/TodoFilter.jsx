import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { updateList } from '../redux/features/todo/TodoSlice';

const TodoFilter = () => {
  
    const dispatch = useDispatch(); 
    var selector = useSelector((state) => state.todo);
    var todos = selector.data;
    var array = [...todos];
    
       
    var sorted = []
    const handleSort = (e) => {
        switch (e.target.value){
            case 'id': 
                sorted = [...todos].sort((a, b) => a.id - b.id);
                break;
            case 'title': 
                sorted = [...todos].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'date':
                // tarih sıralaması artan yani eskiden yeniye
                sorted = [...todos].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
                break;
        }   
        dispatch(updateList(sorted))       
    }

    const handleAngle = () => {
        var sorted = [...array].reverse();
        dispatch(updateList(sorted))       
        setArray(sorted);

    }

    
    const handleSearch = (e) => {
        const val = e.target.value;

        if(!val.trim()){
            dispatch(updateList(todos))     
        }
        else{
            const searchLower = val.toLowerCase();
           
            const filtered = todos.filter(todo => {
                
                return (
                    todo.title?.toLowerCase().includes(searchLower) ||
                    todo.description?.toLowerCase().includes(searchLower) ||
                    todo.status?.toLowerCase().includes(searchLower) ||
                    todo.priority?.toLowerCase().includes(searchLower)
                );
            });

            dispatch(updateList(filtered))       
            console.log(filtered)
        }

    }

    const handleFilterPriority = (e) => {
        var filter = e.target.value;

        var todosPriority = todos.filter((todo) => {
            return todo.priority?.toLowerCase().includes(filter.toLowerCase());
        });
        dispatch(updateList(todosPriority));
    }

    const handleFilterStatus = (e) => {
        var filter = e.target.value;

        var todosStatus = todos.filter((todo) => {
            return todo.status?.toLowerCase().includes(filter.toLowerCase());
        });
        dispatch(updateList(todosStatus));
    }
  
    return (
    <center>

        <div>
            <div id='search'>
                <input type="text" placeholder="Search.." onChange={handleSearch}></input>    
            </div>
            <div id='siralama'>
                <select onChange={handleSort}>
                    <option value="id">Id'ye Göre</option>
                    <option value="title">Title'a Göre</option>
                    <option value="date">Due date'e Göre</option>
                </select>
                <select onChange={handleAngle}>
                    <option value="Asc">Artan</option>
                    <option value="Desc">Azalan</option>
                </select>
            </div>
            <div id='filtre'>
                {/* status priority ve due date e göre filtreleme */}
                <select onChange={handleFilterPriority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <select onChange={handleFilterStatus}>
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

