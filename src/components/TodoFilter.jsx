import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { updateList } from '../redux/features/todo/TodoSlice';

const TodoFilter = () => {
  
    var selector = useSelector((state) => state.todo);
    var todos = selector.data;
    const dispatch = useDispatch(); 
       
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
        sorted = [...todos].reverse();
        dispatch(updateList(sorted))       

    }

    const handleSearch = (e) => {
        

        if(!e.target.value.trim()){
            dispatch(updateList(todos))      
            return 
        }

        const filtered = todos.filter(todo => {
            const searchLower = e.target.value.toLowerCase();
            
            // Multiple field search
            return (
                todo.title?.toLowerCase().includes(searchLower) ||
                todo.description?.toLowerCase().includes(searchLower) ||
                todo.status?.toLowerCase().includes(searchLower) ||
                todo.priority?.toLowerCase().includes(searchLower)
            );
        });

        console.log(filtered)
        dispatch(updateList(filtered))       

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
                <select>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <select>
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

